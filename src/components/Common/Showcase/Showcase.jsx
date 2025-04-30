import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Dropdown from "../Dropdown";
import Typography from "../Typography";
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import ServiceCard from "../ServiceCard";
import ReviewCard from "../ReviewCard";
import Modal from "../Modal";
import Checkbox from "../Checkbox";
import Radio from "../Radio";

const App = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (false) {
      setShowPreferences(true);
    }
  }, []);
  const handleSavePreferences = (preferences) => {
    setShowPreferences(false);
  };

  return (
    <div className="p-8">
      <Typography variant="h1">Showcase</Typography>
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={handleSavePreferences}
      />
      <section className="mb-8">
        <Typography variant="h2">Featured Services</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Deep House Cleaning"
            price="25"
            description="Professional deep cleaning service for your entire home"
            rating={4}
            reviews={128}
            image="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          />
          <ServiceCard
            title="Office Cleaning"
            price="30"
            description="Commercial cleaning service for offices and workspaces"
            rating={5}
            reviews={89}
            image="https://images.unsplash.com/photo-1613963931023-5dc59437c8a6"
          />
          <ServiceCard
            title="Carpet Cleaning"
            price="40"
            description="Professional carpet and upholstery cleaning service"
            rating={4}
            reviews={56}
            image="https://images.unsplash.com/photo-1558317374-067fb5f30001"
          />
        </div>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Recent Reviews</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReviewCard
            rating={5}
            review="Excellent service! The team was professional and thorough."
            author="John Smith"
            serviceType="Deep House Cleaning"
            date="2024-01-15"
          />
          <ReviewCard
            rating={4}
            review="Very satisfied with the cleaning quality. Will book again."
            author="Sarah Johnson"
            serviceType="Office Cleaning"
            date="2024-01-14"
          />
          <ReviewCard
            rating={5}
            review="Amazing results with the carpet cleaning. Looks like new!"
            author="Mike Brown"
            serviceType="Carpet Cleaning"
            date="2024-01-13"
          />
        </div>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Cards</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            variant="basic"
            title="Basic Card"
            content="This is a basic card component"
          />
          <Card
            variant="image"
            title="Image Card"
            content="Card with image"
            image="https://placehold.co/600x400"
          />
          <Card
            variant="hover"
            title="Hover Card"
            content="Hover to see animation"
          />
          <Card
            variant="clickable"
            title="Clickable Card"
            content="Click me!"
            onClick={() => alert("Clicked!")}
          />
        </div>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Buttons</Typography>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="icon" icon={<FiSearch />}>
            Icon
          </Button>
        </div>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Inputs</Typography>
        <div className="max-w-md">
          <Input label="Text Input" placeholder="Enter text" />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
          />
          <Input type="search" label="Search" placeholder="Search..." />
          <Input
            as="textarea"
            label="Textarea"
            placeholder="Enter long text"
            rows={4}
          />
        </div>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Form Controls</Typography>
        <div className="max-w-md space-y-4">
          <Checkbox label="Accept terms and conditions" onChange={(checked) => console.log(checked)} />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <div className="space-y-2">
            <Radio 
              name="options"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3", disabled: true }
              ]}
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <Typography variant="h2">Typography</Typography>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="p">Regular paragraph text</Typography>
        <Typography variant="blockquote">This is a blockquote</Typography>
        <Typography variant="code">const code = 'example';</Typography>
      </section>

      <section className="mb-8">
        <Typography variant="h2">Dropdown</Typography>
        <div className="max-w-md">
          <Dropdown
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3", disabled: true },
            ]}
            onChange={(option) => console.log(option)}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
