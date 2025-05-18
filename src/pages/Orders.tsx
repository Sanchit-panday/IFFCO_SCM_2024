import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, PlusCircle, FileText } from 'lucide-react';
import { orderData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { inventoryData } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const isRetailer = user?.role === 'retailer';
  
  // Filter orders based on user role and search/status filters
  const filteredOrders = orderData.filter(order => {
    // If retailer, only show their orders
    if (isRetailer && order.retailer !== 'Green Growth Inc') {
      return false;
    }
    
    // Apply search filter
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.retailer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getOrdersByStatus = (status: string) => {
    return orderData.filter(order => {
      // If retailer, only show their orders
      if (isRetailer && order.retailer !== 'Green Growth Inc') {
        return false;
      }
      
      return order.status === status;
    });
  };

  const handleCreateOrder = () => {
    toast.success('Order created successfully!');
    setDialogOpen(false);
  };

  return (
    <Layout requiredRole="any">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">
          {isRetailer 
            ? 'Track your orders and place new ones' 
            : 'Manage and process orders from retailers'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isRetailer 
                ? orderData.filter(o => o.retailer === 'Green Growth Inc').length 
                : orderData.length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getOrdersByStatus('Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getOrdersByStatus('In Transit').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently shipping</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getOrdersByStatus('Delivered').length}
            </div>
            <p className="text-xs text-muted-foreground">Completed orders</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Place a new fertilizer order to be processed and delivered
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="product" className="text-right text-sm">
                    Product
                  </label>
                  <div className="col-span-3">
                    <Select defaultValue={inventoryData[0].id.toString()}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {inventoryData.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name} ({item.category})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="quantity" className="text-right text-sm">
                    Quantity (MT)
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    className="col-span-3"
                    placeholder="Enter quantity in metric tons"
                    defaultValue="100"
                  />
                </div>

                {!isRetailer && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="retailer" className="text-right text-sm">
                      Retailer
                    </label>
                    <div className="col-span-3">
                      <Select defaultValue="Green Growth Inc">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select retailer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Green Growth Inc">Green Growth Inc</SelectItem>
                          <SelectItem value="Agri Supplies Ltd">Agri Supplies Ltd</SelectItem>
                          <SelectItem value="Farm Solutions Pvt">Farm Solutions Pvt</SelectItem>
                          <SelectItem value="Krishna Fertilizers">Krishna Fertilizers</SelectItem>
                          <SelectItem value="Haryana Agro Corp">Haryana Agro Corp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="delivery-date" className="text-right text-sm">
                    Delivery Date
                  </label>
                  <Input
                    id="delivery-date"
                    type="date"
                    className="col-span-3"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleCreateOrder}>
                  Create Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    Manage all incoming orders from retailers
                  </CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full md:w-[140px]">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>{isRetailer ? 'Location' : 'Retailer'}</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{isRetailer ? order.location : order.retailer}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'Delivered' ? "outline" :
                            order.status === 'In Transit' ? "secondary" :
                            order.status === 'Processing' ? "default" :
                            order.status === 'Confirmed' ? "secondary" :
                            "outline"
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No orders match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {
                  isRetailer 
                    ? orderData.filter(o => o.retailer === 'Green Growth Inc').length 
                    : orderData.length
                } orders
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders that need processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>{isRetailer ? 'Location' : 'Retailer'}</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getOrdersByStatus('Pending').map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{isRetailer ? order.location : order.retailer}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm">Process</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {getOrdersByStatus('Pending').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No pending orders
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>Orders being prepared</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>{isRetailer ? 'Location' : 'Retailer'}</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getOrdersByStatus('Processing').map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{isRetailer ? order.location : order.retailer}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm">Mark Ready</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {getOrdersByStatus('Processing').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No orders in processing
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transit">
          <Card>
            <CardHeader>
              <CardTitle>In Transit</CardTitle>
              <CardDescription>Orders currently being shipped</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>{isRetailer ? 'Location' : 'Retailer'}</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getOrdersByStatus('In Transit').map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{isRetailer ? order.location : order.retailer}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell className="text-right">
                          {isRetailer ? (
                            <Button variant="outline" size="sm">Track</Button>
                          ) : (
                            <Button variant="secondary" size="sm">Mark Delivered</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {getOrdersByStatus('In Transit').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No orders in transit
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>Completed orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>{isRetailer ? 'Location' : 'Retailer'}</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getOrdersByStatus('Delivered').map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{isRetailer ? order.location : order.retailer}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {getOrdersByStatus('Delivered').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No delivered orders
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Orders;