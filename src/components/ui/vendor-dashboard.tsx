import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Avatar, AvatarFallback } from "./avatar";
import { 
  Search, 
  Clock, 
  Users, 
  MapPin, 
  Package, 
  TrendingDown,
  Plus,
  Filter
} from "lucide-react";

interface GroupOrder {
  id: string;
  product: string;
  currentQty: number;
  targetQty: number;
  pricePerUnit: number;
  bulkPrice: number;
  timeLeft: string;
  location: string;
  participants: number;
  status: "active" | "completed" | "forming";
}

interface VendorDashboardProps {
  vendor: any;
  onLogout: () => void;
}

export function VendorDashboard({ vendor, onLogout }: VendorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  const mockGroupOrders: GroupOrder[] = [
    {
      id: "1",
      product: "Onions (Red)",
      currentQty: 75,
      targetQty: 100,
      pricePerUnit: 45,
      bulkPrice: 38,
      timeLeft: "2h 30m",
      location: "110001",
      participants: 8,
      status: "active"
    },
    {
      id: "2", 
      product: "Cooking Oil (Sunflower)",
      currentQty: 40,
      targetQty: 50,
      pricePerUnit: 180,
      bulkPrice: 165,
      timeLeft: "4h 15m",
      location: "110001",
      participants: 5,
      status: "forming"
    },
    {
      id: "3",
      product: "Rice (Basmati)",
      currentQty: 100,
      targetQty: 100,
      pricePerUnit: 85,
      bulkPrice: 78,
      timeLeft: "Completed",
      location: "110001",
      participants: 12,
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "forming": return "warning";
      case "completed": return "secondary";
      default: return "secondary";
    }
  };

  const getSavingsPercentage = (regular: number, bulk: number) => {
    return Math.round(((regular - bulk) / regular) * 100);
  };

  return (
    <div className="min-h-screen bg-vendor-bg">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {vendor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-lg">{vendor.businessName}</h1>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {vendor.pincode}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse Groups</TabsTrigger>
            <TabsTrigger value="my-orders">My Orders</TabsTrigger>
            <TabsTrigger value="create">Create Group</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products (onions, oil, rice...)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Group Orders Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockGroupOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-[var(--shadow-card)] transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.product}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          Pin: {order.location}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{order.currentQty}kg / {order.targetQty}kg</span>
                        <span className="text-muted-foreground">
                          {Math.round((order.currentQty / order.targetQty) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-all"
                          style={{ width: `${(order.currentQty / order.targetQty) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-groupOrder rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Individual Price</span>
                        <span className="line-through text-sm">₹{order.pricePerUnit}/kg</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Bulk Price</span>
                        <span className="text-lg font-bold text-success">₹{order.bulkPrice}/kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-success border-success">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Save {getSavingsPercentage(order.pricePerUnit, order.bulkPrice)}%
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {order.participants} vendors
                        </div>
                      </div>
                    </div>

                    {/* Time and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {order.timeLeft}
                      </div>
                      <Button 
                        size="sm" 
                        disabled={order.status === "completed"}
                        className="ml-auto"
                      >
                        {order.status === "completed" ? "Completed" : "Join Group"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-orders">
            <Card>
              <CardHeader>
                <CardTitle>My Group Orders</CardTitle>
                <CardDescription>
                  Track your active and completed group purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet. Join a group to get started!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Group Order</CardTitle>
                <CardDescription>
                  Start a new buying group for products you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Group creation feature coming soon!</p>
                  <p className="text-sm mt-2">We're building an easy way for you to start your own buying groups.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}