import React from 'react';
import Typography from '../Common/Typography';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  // Add state for form inputs if you want to make the form functional
  // For example:
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   message: '',
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
                e.preventDefault();
    // Add form submission logic here (e.g., send data to an API)
    alert("Message sent successfully! (Demo)");
    // Optionally reset form:
    // setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      <div className="text-center mb-16">
        <Typography variant="h1" className="text-4xl sm:text-5xl font-bold text-primary mb-4 text-blue-600">
          Contact Us
        </Typography>
        <Typography variant="p" className="text-lg sm:text-xl text-accent max-w-3xl mx-auto">
          Get in touch with our team for any questions, concerns, or booking inquiries. We're here to help!
        </Typography>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information Section */}
        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <Typography variant="h3" className="text-2xl font-bold text-heading mb-6 text-blue-600">
              Contact Information
            </Typography>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <FaPhone size={20} />
                </div>
                <div>
                  <Typography variant="h4" className="font-semibold text-heading">Phone</Typography>
                  <Typography variant="p" className="text-accent">+65 6123 4567</Typography>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <Typography variant="h4" className="font-semibold text-heading">Email</Typography>
                  <Typography variant="p" className="text-accent">contact@cleaningservice.com</Typography>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <Typography variant="h4" className="font-semibold text-heading">Address</Typography>
                  <Typography variant="p" className="text-accent">SIM Headquarters, 461 Clementi Rd, Singapore 599491</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <Typography variant="h3" className="text-2xl font-bold text-heading mb-6 text-blue-600">
            Send us a Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="john@example.com"
              required
            />
            <Input
              label="Phone (Optional)"
              type="tel"
              name="phone"
              placeholder="9123 4567"
            />
            <Input
              as="textarea"
              label="Message"
              name="message"
              placeholder="How can we help you?"
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="large"
              className="py-3"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Typography variant="h3" className="text-2xl font-bold text-heading mb-6 text-center text-blue-600">
            Find Us on the Map
          </Typography>
          <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5962.341895354098!2d103.77359957496567!3d1.3294011986579986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1080893304bd%3A0xc889e76f4e447e42!2sSIM%20Global%20Education!5e1!3m2!1sen!2ssg!4v1747042735722!5m2!1sen!2ssg"
              width="100%"
              height="100%"
              style={{ border:0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
