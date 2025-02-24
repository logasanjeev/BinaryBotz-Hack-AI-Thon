import tkinter as tk
from tkinter import filedialog, messagebox
from tkinter import ttk
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
import base64, os, webbrowser, tempfile

# Try to import tkinterdnd2 for drag and drop functionality
try:
    from tkinterdnd2 import TkinterDnD, DND_FILES
except ImportError:
    TkinterDnD = None
    DND_FILES = None

# Global variable to store the last used file path
last_file_path = ""

# --- Constants for Embedded Signature Markers ---
MARKER_START = b"\n-----BEGIN SIGNATURE-----\n"
MARKER_END = b"\n-----END SIGNATURE-----\n"

# ------------------------- Drag & Drop Entry Widget -------------------------
if TkinterDnD:
    class DragDropEntry(tk.Entry):
        def __init__(self, master, **kw):
            super().__init__(master, **kw)
            self.drop_target_register(DND_FILES)
            self.dnd_bind('<<Drop>>', self.drop)
        def drop(self, event):
            data = event.data
            # Remove curly braces (if any) from dropped file paths.
            if data.startswith('{') and data.endswith('}'):
                data = data[1:-1]
            self.delete(0, tk.END)
            self.insert(0, data)
else:
    DragDropEntry = tk.Entry  # Fallback if tkinterdnd2 isn't installed

# ------------------------- Key Loading Functions -------------------------
def load_private_key(file_path):
    with open(file_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(), password=None, backend=default_backend()
        )
    return private_key

def load_public_key(file_path):
    with open(file_path, "rb") as key_file:
        public_key = serialization.load_pem_public_key(
            key_file.read(), backend=default_backend()
        )
    return public_key

# ------------------------- Signature Embedding Helpers -------------------------
def remove_existing_signature(file_data):
    """If a signature block is found at the end of file_data, remove it."""
    pos = file_data.rfind(MARKER_START)
    if pos != -1:
        # Ensure that the marker_end follows
        end_pos = file_data.find(MARKER_END, pos)
        if end_pos != -1:
            return file_data[:pos]
    return file_data

def embed_signature(file_data, signature_bytes):
    """Return new file content: original data plus signature block."""
    return file_data + MARKER_START + signature_bytes + MARKER_END

def extract_embedded_signature(file_data):
    """Return a tuple (original_data, signature_bytes or None)"""
    pos = file_data.rfind(MARKER_START)
    if pos != -1:
        end_pos = file_data.find(MARKER_END, pos)
        if end_pos != -1:
            original = file_data[:pos]
            # Extract signature (strip any whitespace)
            sig_data = file_data[pos + len(MARKER_START): end_pos].strip()
            return original, sig_data
    return file_data, None

# ------------------------- Signing and Verification -------------------------
def sign_file(file_path, private_key_path):
    if not verify_parameters(file_path, private_key_path):
        return
    try:
        private_key = load_private_key(private_key_path)
        content = read_file(file_path)
        if content is None:
            return
        # Remove any existing signature block before signing
        original_content = remove_existing_signature(content)
        digest = hashes.Hash(hashes.SHA3_256(), backend=default_backend())
        digest.update(original_content)
        hash_value = digest.finalize()
        signature = private_key.sign(
            hash_value,
            padding.PSS(mgf=padding.MGF1(hashes.SHA3_256()), salt_length=0),
            hashes.SHA3_256(),
        )
        # Base64-encode the signature as bytes
        encoded_signature = base64.b64encode(signature)
        new_content = embed_signature(original_content, encoded_signature)
        # Overwrite the file with the new container content
        with open(file_path, "wb") as f:
            f.write(new_content)
        messagebox.showinfo("Signature", "File signed successfully!\nThe signature has been embedded in the file.")

    except Exception as e:
        messagebox.showerror("Error", f"Failed to sign the file.\n{e}")

def verify_signature(file_path, public_key_path):
    if not verify_parameters(file_path, public_key_path):
        return
    try:
        public_key = load_public_key(public_key_path)
        content = read_file(file_path)
        if content is None:
            return
        original, sig_data = extract_embedded_signature(content)
        if sig_data is None:
            messagebox.showwarning("Verification", "No embedded signature found in the file.")
            return
        signature = base64.b64decode(sig_data)
        digest = hashes.Hash(hashes.SHA3_256(), backend=default_backend())
        digest.update(original)
        hash_value = digest.finalize()
        public_key.verify(
            signature,
            hash_value,
            padding.PSS(mgf=padding.MGF1(hashes.SHA3_256()), salt_length=0),
            hashes.SHA3_256(),
        )
        messagebox.showinfo("Verification", "The signature is valid :)")
    except Exception as e:
        messagebox.showinfo("Verification", f"Signature verification failed :(\n{e}")

def verify_parameters(file_path, key):
    # Using a temporary hidden Tk instance for dialogs (if needed)
    temp = tk.Tk()
    temp.withdraw()
    if not file_path:
        messagebox.showwarning("Warning", "Please select a file.")
        temp.destroy()
        return False
    if not os.path.exists(file_path):
        messagebox.showwarning("Warning", "The file does not exist.")
        temp.destroy()
        return False
    if not key:
        messagebox.showwarning("Warning", "Please select a key.")
        temp.destroy()
        return False
    if not os.path.exists(key):
        messagebox.showwarning("Warning", "The key does not exist.")
        temp.destroy()
        return False
    temp.destroy()
    return True

# ------------------------- File IO Functions -------------------------
def open_file(file_path):
    """If the file has an embedded signature block, extract the original content into a temp file and open it."""
    try:
        content = read_file(file_path)
        if content is None:
            return
        original, sig = extract_embedded_signature(content)
        # If a signature block exists, write original content to a temp file
        if sig is not None:
            temp_fd, temp_path = tempfile.mkstemp()
            os.close(temp_fd)
            with open(temp_path, "wb") as temp_file:
                temp_file.write(original)
            file_to_open = temp_path
        else:
            file_to_open = file_path

        if os.name == "nt":  # Windows
            os.startfile(file_to_open)
        else:
            webbrowser.open(file_to_open)
    except Exception as e:
        print(f"Error opening the file: {e}")

def read_file(file_path):
    try:
        with open(file_path, "rb") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading the file: {e}")
        messagebox.showwarning("Read error", f"Error reading the file.\n{e}")
        return None

# ------------------------- RSA Key Generation -------------------------
def generate_key_pair(private_key_path, public_key_path):
    """Generate a new RSA key pair and save them to the specified file paths."""
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend()
    )
    public_key = private_key.public_key()
    private_pem = private_key.private_bytes(
         encoding=serialization.Encoding.PEM,
         format=serialization.PrivateFormat.PKCS8,
         encryption_algorithm=serialization.NoEncryption()
    )
    public_pem = public_key.public_bytes(
         encoding=serialization.Encoding.PEM,
         format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    with open(private_key_path, "wb") as f:
         f.write(private_pem)
    with open(public_key_path, "wb") as f:
         f.write(public_pem)
    return private_key, public_key

def generate_and_save_keys(private_key_path, public_key_path):
    if not private_key_path or not public_key_path:
        messagebox.showwarning("Warning", "Please specify both paths.")
        return
    try:
        generate_key_pair(private_key_path, public_key_path)
        messagebox.showinfo("Success", f"Keys generated and saved:\nPrivate: {private_key_path}\nPublic: {public_key_path}")
    except Exception as e:
        messagebox.showerror("Error", f"Failed to generate keys.\n{e}")

# ------------------------- GUI Windows -------------------------
def main_menu():
    # Use TkinterDnD.Tk if available (for drag and drop), otherwise fall back to tk.Tk
    if TkinterDnD:
        root = TkinterDnD.Tk()
    else:
        root = tk.Tk()
    root.title("RSA Signing Tool")
    root.geometry("800x500")  # Higher resolution for better UI
    root.config(bg="#f5f5f5")
    
    main_frame = tk.Frame(root, padx=30, pady=30, bg="#f5f5f5")
    main_frame.pack(expand=True)
    
    title_label = tk.Label(main_frame, text="RSA Signing Tool", font=("Arial", 20, "bold"), bg="#f5f5f5")
    title_label.pack(pady=(0, 30))
    
    button_frame = tk.Frame(main_frame, bg="#f5f5f5")
    button_frame.pack()
    
    tk.Button(button_frame, text="Sign", command=lambda: sign_verify_menu(root, "Sign"),
              bg="#2c3e50", fg="white", width=15, font=("Arial", 14), relief="flat", bd=0).pack(side=tk.LEFT, padx=20, pady=10)
    tk.Button(button_frame, text="Verify", command=lambda: sign_verify_menu(root, "Verify"),
              bg="#2980b9", fg="white", width=15, font=("Arial", 14), relief="flat", bd=0).pack(side=tk.LEFT, padx=20, pady=10)
    tk.Button(button_frame, text="Generate Key", command=lambda: generate_key_menu(root),
              bg="#27ae60", fg="white", width=15, font=("Arial", 14), relief="flat", bd=0).pack(side=tk.LEFT, padx=20, pady=10)
    
    root.mainloop()

def sign_verify_menu(parent_window, action):
    parent_window.withdraw()
    action_window = tk.Toplevel()
    action_window.title(f"{action} File")
    action_window.geometry("800x500")
    action_window.config(bg="#ecf0f1")
    
    frame = tk.Frame(action_window, padx=30, pady=30, bg="#ecf0f1")
    frame.pack(fill="both", expand=True)
    
    # File Path Entry with Drag & Drop support
    tk.Label(frame, text="File Path:", font=("Arial", 14), bg="#ecf0f1").pack(anchor="w", pady=(0, 10))
    file_path_entry = DragDropEntry(frame, width=50, font=("Arial", 12))
    file_path_entry.pack(fill="x", pady=(0, 15))
    file_path_entry.insert(0, last_file_path)
    tk.Button(frame, text="Select File", command=lambda: select_file(file_path_entry),
              font=("Arial", 12), relief="flat", bd=0, bg="#3498db", fg="white").pack(anchor="e")
    
    # Key Path Entry with Drag & Drop support
    tk.Label(frame, text="Key Path:", font=("Arial", 14), bg="#ecf0f1").pack(anchor="w", pady=(10, 10))
    key_entry = DragDropEntry(frame, width=50, font=("Arial", 12))
    key_entry.pack(fill="x", pady=(0, 15))
    tk.Button(frame, text="Select Key",
              command=lambda: select_file(key_entry, [("PEM files", "*.pem;*.key"), ("All files", "*.*")]),
              font=("Arial", 12), relief="flat", bd=0, bg="#3498db", fg="white").pack(anchor="e")
    
    # For verification, no separate signature entry is needed because the signature is embedded.
    button_frame = tk.Frame(frame, bg="#ecf0f1")
    button_frame.pack(pady=20)
    tk.Button(button_frame, text="Back", command=lambda: close_window(action_window, parent_window),
              font=("Arial", 14), bg="#7f8c8d", fg="white", relief="flat", bd=0).pack(side=tk.LEFT, padx=20)
    
    if action == "Sign":
        button_text = "Sign File"
        button_color = "#2c3e50"
        command = lambda: sign_file(file_path_entry.get(), key_entry.get())
    else:  # Verify
        button_text = "Verify Signature"
        button_color = "#3498db"
        command = lambda: verify_signature(file_path_entry.get(), key_entry.get())
    
    tk.Button(button_frame, text=button_text, bg=button_color, font=("Arial", 14, "bold"),
              relief="flat", bd=0, command=command).pack(side=tk.LEFT, padx=20)

def close_window(action_window, parent_window):
    action_window.destroy()
    parent_window.deiconify()

def select_file(entry_widget, filetypes=None):
    filetypes = filetypes or [("All Files", "*.*")]
    file_path = filedialog.askopenfilename(filetypes=filetypes)
    if file_path:
        entry_widget.delete(0, tk.END)
        entry_widget.insert(0, file_path)
        global last_file_path
        last_file_path = file_path

def generate_key_menu(parent_window):
    parent_window.withdraw()
    gen_window = tk.Toplevel()
    gen_window.title("Generate New RSA Key Pair")
    gen_window.geometry("800x500")
    gen_window.config(bg="#ecf0f1")
    
    frame = tk.Frame(gen_window, padx=30, pady=30, bg="#ecf0f1")
    frame.pack(fill="both", expand=True)
    
    tk.Label(frame, text="Private Key Save Path:", font=("Arial", 14), bg="#ecf0f1").pack(anchor="w", pady=(0, 10))
    private_entry = tk.Entry(frame, width=50, font=("Arial", 12))
    private_entry.pack(fill="x", pady=(0, 15))
    tk.Button(frame, text="Browse", command=lambda: select_save_file(private_entry, "Save Private Key",
              [("PEM files", "*.pem;*.key"), ("All files", "*.*")]), font=("Arial", 12),
              relief="flat", bd=0, bg="#3498db", fg="white").pack(anchor="e")
    
    tk.Label(frame, text="Public Key Save Path:", font=("Arial", 14), bg="#ecf0f1").pack(anchor="w", pady=(10, 10))
    public_entry = tk.Entry(frame, width=50, font=("Arial", 12))
    public_entry.pack(fill="x", pady=(0, 15))
    tk.Button(frame, text="Browse", command=lambda: select_save_file(public_entry, "Save Public Key",
              [("PEM files", "*.pem;*.key"), ("All files", "*.*")]), font=("Arial", 12),
              relief="flat", bd=0, bg="#3498db", fg="white").pack(anchor="e")
    
    button_frame = tk.Frame(frame, bg="#ecf0f1")
    button_frame.pack(pady=20)
    tk.Button(button_frame, text="Back", command=lambda: close_window(gen_window, parent_window),
              font=("Arial", 14), bg="#7f8c8d", fg="white", relief="flat", bd=0).pack(side=tk.LEFT, padx=20)
    tk.Button(button_frame, text="Generate Key Pair",
              command=lambda: generate_and_save_keys(private_entry.get(), public_entry.get()),
              bg="#27ae60", fg="white", font=("Arial", 14, "bold"), relief="flat", bd=0).pack(side=tk.LEFT, padx=20)

def select_save_file(entry_widget, title, filetypes):
    file_path = filedialog.asksaveasfilename(title=title, filetypes=filetypes, defaultextension=".pem")
    if file_path:
        entry_widget.delete(0, tk.END)
        entry_widget.insert(0, file_path)

if __name__ == "__main__":
    main_menu()
