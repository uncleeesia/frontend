import React from "react";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Typography
          variant="h1"
          className="text-4xl sm:text-5xl font-bold text-primary mb-4  text-blue-600"
        >
          About Our Cleaning Services
        </Typography>
        <Typography
          variant="p"
          className="text-lg sm:text-xl text-accent max-w-3xl mx-auto"
        >
          We are dedicated to providing top-quality cleaning services with a
          focus on customer satisfaction, meticulous attention to detail, and
          environmental responsibility.
        </Typography>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <Typography
            variant="h2"
            className="text-3xl font-semibold text-heading text-blue-600"
          >
            Our Mission
          </Typography>
          <Typography variant="p" className="text-accent leading-relaxed">
            To deliver exceptional cleaning services that transform spaces and
            enhance the quality of life for our clients. We strive to achieve
            this by maintaining the highest standards of professionalism,
            employing skilled and trustworthy staff, and utilizing eco-friendly
            practices.
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-secondary/10 rounded-lg text-center shadow-sm">
              <Typography
                variant="h3"
                className="text-3xl font-bold text-primary mb-2 text-blue-600"
              >
                500+
              </Typography>
              <Typography variant="p" className="text-accent font-medium">
                Happy Clients
              </Typography>
            </div>
            <div className="p-6 bg-secondary/10 rounded-lg text-center shadow-sm">
              <Typography
                variant="h3"
                className="text-3xl font-bold text-primary mb-2 text-blue-600"
              >
                1000+
              </Typography>
              <Typography variant="p" className="text-accent font-medium">
                Projects Completed
              </Typography>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Professional Cleaning Team at Work"
            className="w-full h-auto md:h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-secondary/10 rounded-lg p-8 mb-16 shadow-sm">
        <Typography
          variant="h2"
          className="text-3xl font-semibold text-heading text-center mb-8 text-blue-600"
        >
          Our Core Values
        </Typography>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <Typography
              variant="h4"
              className="text-xl font-bold text-primary mb-2"
            >
              Integrity
            </Typography>
            <Typography variant="p" className="text-accent">
              Honest and transparent in all our dealings and communications.
            </Typography>
          </div>
          <div className="p-4">
            <Typography
              variant="h4"
              className="text-xl font-bold text-primary mb-2"
            >
              Reliability
            </Typography>
            <Typography variant="p" className="text-accent">
              Consistent, dependable, and high-quality service delivery every
              time.
            </Typography>
          </div>
          <div className="p-4">
            <Typography
              variant="h4"
              className="text-xl font-bold text-primary mb-2"
            >
              Excellence
            </Typography>
            <Typography variant="p" className="text-accent">
              Striving for perfection and adopting the latest cleaning
              technologies.
            </Typography>
          </div>
          <div className="p-4">
            <Typography
              variant="h4"
              className="text-xl font-bold text-primary mb-2"
            >
              Customer Focus
            </Typography>
            <Typography variant="p" className="text-accent">
              Your complete satisfaction is our ultimate priority and measure of
              success.
            </Typography>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="flex justify-center flex-col text-center">
        <Typography
          variant="h2"
          className="text-3xl font-semibold text-heading mb-6 text-blue-600"
        >
          Ready to Experience Our Premier Service?
        </Typography>
        <Button
          variant="primary"
          size="large"
          className="px-8 py-3 text-lg mx-auto"
          onClick={() => navigate("/")}
        >
          Book Your Cleaning Now
        </Button>
      </div>
    </div>
  );
};

export default About;
