import { useState } from "react";
import { VendorAuth } from "@/components/ui/vendor-auth";
import { VendorDashboard } from "@/components/ui/vendor-dashboard";
import { AdminDashboard } from "@/components/ui/admin-dashboard";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const [currentVendor, setCurrentVendor] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLogin = (vendorData: any) => {
    setCurrentVendor(vendorData);
  };

  const handleLogout = () => {
    setCurrentVendor(null);
    setShowAdmin(false);
  };

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />;
  }

  if (!currentVendor) {
    return (
      <div className="relative">
        <VendorAuth onLogin={handleLogin} />
        {/* Admin Access Button */}
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-10"
          onClick={() => setShowAdmin(true)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin Panel
        </Button>
      </div>
    );
  }

  return <VendorDashboard vendor={currentVendor} onLogout={handleLogout} />;
};

export default Index;
