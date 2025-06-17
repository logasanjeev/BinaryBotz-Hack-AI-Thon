import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const carouselItems = [
  {
    title: "Protect Your Future with SBI Insurance",
    content:
      "Your peace of mind is our priority. SBI Insurance offers a wide range of policies to safeguard you and your loved ones from life’s uncertainties. Log in to explore your policy details, make premium payments, and manage your insurance with ease."
  },
  {
    title: "Hassle-Free Claim Process, When You Need It Most",
    content:
      "SBI Insurance ensures a smooth and transparent claim settlement process. Whether it’s health, life, or general insurance, we provide quick support so you can focus on what truly matters. Track your claims, submit documents, and get real-time updates—all in one place."
  },
  {
    title: "Tailored Plans for Every Stage of Life",
    content:
      "From health and term insurance to motor and travel coverage, SBI Insurance has a plan for everyone. Our policies are designed to provide financial security and peace of mind, no matter your needs. Log in now to explore options and secure your future."
  },
  {
    title: "Secure & Convenient Access to Your Policy",
    content:
      "Managing your insurance has never been easier. With SBI Insurance’s online portal, you can view policy details, renew premiums, update personal information, and raise service requests anytime, anywhere. Enjoy a seamless digital experience at your fingertips."
  }
];

export default function InsuranceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-10">
      <Carousel>
        <CarouselContent style={{ transform: `translateX(-${activeIndex * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full ">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent>
                  <h1 className="text-3xl font-semibold mb-2 text-white">{item.title}</h1>
                  <br/>
                  <p className="text-white text-lg">{item.content}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
