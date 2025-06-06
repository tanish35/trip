"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function CustomTripPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    description: "",
  });
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/gemini/generateTrip", form);
      setItinerary(res.data.itinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setItinerary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-pink-300 p-4">
      <Card className="w-full max-w-xl shadow-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Customize Your Trip
          </h2>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. John Doe"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Details</Label>
            <Input
              id="contact"
              name="contact"
              placeholder="+91 9876543210"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Trip Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us what kind of trip you want..."
              onChange={handleChange}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating Itinerary..." : "Submit ✈️"}
          </Button>
          {itinerary && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Your Personalized Itinerary:
              </h3>
              <div className="bg-muted p-4 rounded whitespace-pre-wrap">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
