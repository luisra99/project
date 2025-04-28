import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MenuPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-center">Nuestro Menú</h1>
      <p className="text-muted-foreground text-center mb-10">
        Elaborado con pasión y los mejores ingredientes
      </p>

      {/* Entradas */}
      <section className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Entradas</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    Carpaccio de Remolacha Asada
                  </h3>
                  <p className="text-muted-foreground">
                    Queso de cabra, rúcula, pistachos, reducción de balsámico
                  </p>
                </div>
                <span className="font-medium">$14</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Vieiras Selladas</h3>
                  <p className="text-muted-foreground">
                    Puré de coliflor, tocino, aceite de trufa
                  </p>
                </div>
                <span className="font-medium">$18</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    Risotto de Hongos Silvestres
                  </h3>
                  <p className="text-muted-foreground">
                    Porcini, shiitake, parmesano, hierbas
                  </p>
                </div>
                <span className="font-medium">$16</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platos Principales */}
      <section className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Platos Principales</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Filete Mignon</h3>
                  <p className="text-muted-foreground">
                    Puré de papas con trufa, vegetales de temporada, reducción
                    de vino tinto
                  </p>
                </div>
                <span className="font-medium">$38</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    Costillar de Cordero con Hierbas
                  </h3>
                  <p className="text-muted-foreground">
                    Polenta con romero, zanahorias glaseadas, jugo de menta
                  </p>
                </div>
                <span className="font-medium">$42</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Lubina Sellada</h3>
                  <p className="text-muted-foreground">
                    Risotto de azafrán, espárragos, beurre blanc de limón
                  </p>
                </div>
                <span className="font-medium">$36</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    Linguini de Hongos Silvestres
                  </h3>
                  <p className="text-muted-foreground">
                    Crema de trufa, parmesano, hierbas frescas
                  </p>
                </div>
                <span className="font-medium">$28</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Postres */}
      <section>
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-muted flex-grow" />
          <h2 className="text-2xl font-semibold px-4">Postres</h2>
          <div className="h-px bg-muted flex-grow" />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    Soufflé de Chocolate Oscuro
                  </h3>
                  <p className="text-muted-foreground">
                    Helado de vainilla, caramelo salado
                  </p>
                </div>
                <span className="font-medium">$12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Tarta de Limón</h3>
                  <p className="text-muted-foreground">
                    Merengue italiano, frutos rojos frescos
                  </p>
                </div>
                <span className="font-medium">$10</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Tiramisú</h3>
                  <p className="text-muted-foreground">
                    Café expreso, mascarpone, cacao
                  </p>
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
          Nuestro menú cambia según la temporada para incorporar los
          ingredientes más frescos. <br />
          Por favor informe a su mesero sobre cualquier alergia o restricción
          dietética.
        </p>
      </div>
    </div>
  );
}
