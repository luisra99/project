import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MenuPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-center">Our Menu</h1>
      <p className="text-muted-foreground text-center mb-10">
        Crafted with passion and the finest ingredients
      </p>
      
      {/* Starters */}
      <section className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Starters</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Roasted Beet Carpaccio</h3>
                  <p className="text-muted-foreground">Goat cheese, arugula, pistachios, balsamic reduction</p>
                </div>
                <span className="font-medium">$14</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Seared Scallops</h3>
                  <p className="text-muted-foreground">Cauliflower purée, bacon, truffle oil</p>
                </div>
                <span className="font-medium">$18</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Wild Mushroom Risotto</h3>
                  <p className="text-muted-foreground">Porcini, shiitake, parmesan, herbs</p>
                </div>
                <span className="font-medium">$16</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Main Courses */}
      <section className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Main Courses</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Filet Mignon</h3>
                  <p className="text-muted-foreground">Truffle mashed potatoes, seasonal vegetables, red wine reduction</p>
                </div>
                <span className="font-medium">$38</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Herb-Crusted Rack of Lamb</h3>
                  <p className="text-muted-foreground">Rosemary polenta, glazed carrots, mint jus</p>
                </div>
                <span className="font-medium">$42</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Pan-Seared Sea Bass</h3>
                  <p className="text-muted-foreground">Saffron risotto, asparagus, lemon beurre blanc</p>
                </div>
                <span className="font-medium">$36</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Wild Mushroom Linguine</h3>
                  <p className="text-muted-foreground">Truffle cream, parmesan, fresh herbs</p>
                </div>
                <span className="font-medium">$28</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Desserts */}
      <section>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Desserts</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Dark Chocolate Soufflé</h3>
                  <p className="text-muted-foreground">Vanilla bean ice cream, salted caramel</p>
                </div>
                <span className="font-medium">$12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Lemon Tart</h3>
                  <p className="text-muted-foreground">Italian meringue, fresh berries</p>
                </div>
                <span className="font-medium">$10</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Tiramisu</h3>
                  <p className="text-muted-foreground">Espresso, mascarpone, cocoa</p>
                </div>
                <span className="font-medium">$11</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <div className="mt-12">
        <Separator className="mb-6" />
        <p className="text-center text-sm text-muted-foreground italic">
          Our menu changes seasonally to incorporate the freshest ingredients. <br />
          Please inform your server of any allergies or dietary restrictions.
        </p>
      </div>
    </div>
  );
}