"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Heart, Umbrella, Coins, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image"
import b from "@/assets/b.png"

const products = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Term Life Insurance",
    description: "Protect your family's financial future with comprehensive term life coverage"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health Insurance",
    description: "Stay protected against medical emergencies with our health insurance plans"
  },
  {
    icon: <Umbrella className="w-8 h-8" />,
    title: "Retirement Plans",
    description: "Secure your golden years with our flexible retirement savings plans"
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: "Investment Plans",
    description: "Grow your wealth with our market-linked investment solutions"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className= "relative h-[90vh] flex items-center">
        <div className="absolute  inset-0 bg-cover bg-center">
          <Image
            src={b}
            alt="b"
            width={1500}
          />
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#DB044A] via-[#AB0D57] to-[#3A1B78] opacity-90"
        />

        <div className="mx-6 px-4 relative z-10 text-white w-[50%]">
          
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-10 h-10" />
              <h1 className="text-4xl md:text-6xl font-bold">SBI Life Insurance</h1>
            </div>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Secure your family's future with India's most trusted life insurance provider. 
              Get comprehensive coverage and peace of mind.
            </p>

            
        </div>
      </div>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3A1B78] mb-4">
              Our Insurance Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of comprehensive insurance solutions designed to protect what matters most to you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-[#DB044A] mb-4">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#3A1B78]">
                      {product.title}
                    </h3>
                    <p className="text-gray-600">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3A1B78] text-center mb-12">
              Why Choose SBI Life Insurance?
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DB044A] text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Trusted Brand</h3>
                  <p className="text-gray-600">
                    Backed by India's largest bank with decades of experience in financial services
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DB044A] text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
                  <p className="text-gray-600">
                    Comprehensive insurance solutions for every stage of life
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DB044A] text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Claims</h3>
                  <p className="text-gray-600">
                    Hassle-free and quick claim settlement process
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-r from-[#DB044A] via-[#AB0D57] to-[#3A1B78]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Millions
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Join the millions of Indians who trust SBI Life Insurance for their protection needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-[#DB044A] mb-2">2.5Cr+</div>
                <div className="text-gray-600">Active Policies</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-[#DB044A] mb-2">₹2.5L Cr+</div>
                <div className="text-gray-600">Assets Under Management</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-[#DB044A] mb-2">98.5%</div>
                <div className="text-gray-600">Claim Settlement Ratio</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-[#DB044A] mb-2">17,000+</div>
                <div className="text-gray-600">Branch Network</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#3A1B78] mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  Have questions? Our team of insurance experts is here to help you choose the right coverage for your needs.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
                <Input type="tel" placeholder="Phone Number" />
                <Textarea placeholder="Your Message" className="h-32" />
                <Button 
                  type="submit"
                  className="w-full bg-[#DB044A] hover:bg-[#AB0D57] text-white"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#3A1B78] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About SBI Life</h3>
              <p className="text-white/80">
                SBI Life Insurance is one of India's leading life insurance companies, offering a comprehensive range of life insurance and investment solutions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Products</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Claims</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-white/80">1800-267-9090</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-white/80">info@sbilife.co.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-white/80">Mumbai, Maharashtra</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-white/80 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/20" />

          <div className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} SBI Life Insurance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}