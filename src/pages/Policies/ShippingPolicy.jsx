import React from "react";
import Layout from "../../MainComponent/Layout";
import { Accordion } from "react-bootstrap";
import "./Policies.css";

const ShippingPolicy = () => {
  const shippingData = [
    {
      title: "Delivery Timeframes & Options",
      content: [
        "Standard Delivery (3-5 business days)",
        "Express Delivery (1-2 business days)",
        "Same Day Delivery (select cities only)",
        "Remote areas may require additional 2-3 business days",
        "International shipping currently not available",
      ],
    },
    {
      title: "Shipping Costs",
      content: [
        "Free shipping on orders above ₹999",
        "Standard shipping: ₹99 for orders below ₹999",
        "Express shipping: Additional ₹199",
        "Same day delivery: Additional ₹299",
        "Remote areas: Additional ₹199",
      ],
    },
    {
      title: "Order Tracking",
      content: [
        "Tracking number provided via email",
        "Real-time tracking updates",
        "SMS notifications at key delivery stages",
        "Live tracking through our website",
        "Delivery confirmation email",
      ],
    },
    {
      title: "Shipping Restrictions",
      content: [
        "Some products may not be available for all regions",
        "Hazardous materials have special shipping requirements",
        "Maximum order weight: 30kg",
        "Size restrictions apply for certain items",
        "Some remote locations may have limited delivery options",
      ],
    },
  ];

  return (
    <Layout title="Shipping Policy">
      <div className="policy-container">
        <h1 className="text-center mb-4">Shipping Policy</h1>
        <div className="policy-content">
          <Accordion className="custom-accordion">
            {shippingData.map((section, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>{section.title}</Accordion.Header>
                <Accordion.Body>
                  <ul className="policy-list">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
