import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Badge } from "./badge";
import { Store, Phone, MapPin, User } from "lucide-react";

interface VendorAuthProps {
  onLogin: (vendorData: any) => void;
}

export function VendorAuth({ onLogin }: VendorAuthProps) {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    businessName: "",
    pincode: "",
    businessType: ""
  });

  const handleLogin = () => {
    // Simple auth simulation
    onLogin({
      id: "vendor-" + Date.now(),
      name: formData.name || "Demo Vendor",
      phone: formData.phone,
      businessName: formData.businessName || "Demo Store",
      pincode: formData.pincode || "110001",
      businessType: formData.businessType || "Grocery"
    });
  };

  const handleRegister = () => {
    if (!formData.name || !formData.phone || !formData.pincode) {
      alert("Please fill all required fields");
      return;
    }
    onLogin({
      id: "vendor-" + Date.now(),
      name: formData.name,
      phone: formData.phone,
      businessName: formData.businessName,
      pincode: formData.pincode,
      businessType: formData.businessType
    });
  };

  return (
    <div className="min-h-screen bg-vendor-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-elevated)]">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">VendorHub</CardTitle>
          <CardDescription>
            Join buying groups and save on wholesale purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleLogin} className="w-full" size="lg">
                Login
              </Button>
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  Demo Mode - No real authentication
                </Badge>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-reg">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone-reg"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business">Business Name</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="business"
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode">Pin Code *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pincode"
                    placeholder="Area pin code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button onClick={handleRegister} className="w-full" size="lg">
                Register
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}