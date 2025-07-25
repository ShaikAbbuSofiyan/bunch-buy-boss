import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { 
  Users, 
  Package, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings
} from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeOrders] = useState([
    {
      id: "GR001",
      product: "Onions (Red)",
      totalQty: 500,
      currentQty: 375,
      vendors: 15,
      pricePerUnit: 38,
      timeLeft: "2h 30m",
      status: "active"
    },
    {
      id: "GR002", 
      product: "Cooking Oil",
      totalQty: 200,
      currentQty: 160,
      vendors: 8,
      pricePerUnit: 165,
      timeLeft: "4h 15m",
      status: "active"
    }
  ]);

  const [completedOrders] = useState([
    {
      id: "GR003",
      product: "Rice (Basmati)",
      totalQty: 1000,
      vendors: 25,
      pricePerUnit: 78,
      completedAt: "2 hours ago",
      status: "completed"
    }
  ]);

  const stats = {
    totalVendors: 156,
    activeGroups: 8,
    completedOrders: 23,
    totalVolume: "12,500 kg"
  };

  return (
    <div className="min-h-screen bg-vendor-bg">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Supplier Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage group orders and vendor requests</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Vendor View
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Vendors</p>
                  <p className="text-2xl font-bold">{stats.totalVendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-warning" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                  <p className="text-2xl font-bold">{stats.activeGroups}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                  <p className="text-2xl font-bold">{stats.completedOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">{stats.totalVolume}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {order.product}
                          <Badge variant="outline">#{order.id}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {order.vendors} vendors • Target: {order.totalQty}kg
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-warning border-warning">
                        <Clock className="h-3 w-3 mr-1" />
                        {order.timeLeft}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Progress</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{order.currentQty}kg collected</span>
                            <span>{Math.round((order.currentQty / order.totalQty) * 100)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full"
                              style={{ width: `${(order.currentQty / order.totalQty) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Pricing</p>
                        <p className="text-lg font-bold">₹{order.pricePerUnit}/kg</p>
                        <p className="text-sm text-muted-foreground">
                          Total: ₹{(order.currentQty * order.pricePerUnit).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          Process Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {order.product}
                          <Badge variant="outline">#{order.id}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {order.vendors} vendors • {order.totalQty}kg delivered
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
                        <p className="text-lg font-semibold">{order.totalQty}kg</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                        <p className="text-lg font-semibold">
                          ₹{(order.totalQty * order.pricePerUnit).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Completed</p>
                        <p className="text-sm">{order.completedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
                <CardDescription>
                  Track platform performance and vendor engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p>Detailed analytics and reporting features are being developed.</p>
                  <p className="text-sm mt-2">Coming soon: Order trends, vendor performance, and market insights.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}