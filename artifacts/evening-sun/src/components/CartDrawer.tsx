import { useState } from 'react';
import { Plus, Minus, X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatNaira, CONTACT_PHONE, generateWhatsAppLink } from '@/lib/utils';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [instructions, setInstructions] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) return;

    let orderText = `*NEW ORDER - EVENING SUN*\n\n`;
    orderText += `*Order Type:* ${deliveryType.toUpperCase()}\n`;
    if (instructions) {
      orderText += `*Instructions:* ${instructions}\n\n`;
    } else {
      orderText += `\n`;
    }
    
    orderText += `*ITEMS:*\n`;
    items.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name} x${item.quantity} - ${formatNaira(item.price * item.quantity)}\n`;
    });
    
    orderText += `\n*TOTAL: ${formatNaira(totalPrice)}*\n`;
    
    if (deliveryType === 'delivery') {
      orderText += `_(Delivery fee will be calculated based on your location)_`;
    }

    window.open(generateWhatsAppLink(CONTACT_PHONE, orderText), '_blank');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full border-l border-border bg-background p-0">
        <SheetHeader className="p-6 border-b border-border/50 text-left">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-20 h-20 mb-4 text-muted-foreground" />
              <p className="text-xl font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some delicious items to get started!</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-border/50 bg-card">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary font-bold text-sm mt-1">{formatNaira(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1 w-fit">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-background text-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-background text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-sm">
                          {formatNaira(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="border-t border-border/50 pt-6">
                <h4 className="font-bold mb-3">Order Options</h4>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-4">
                  <button
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      deliveryType === 'delivery' 
                        ? 'bg-background shadow-sm text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    Delivery
                  </button>
                  <button
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      deliveryType === 'pickup' 
                        ? 'bg-background shadow-sm text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setDeliveryType('pickup')}
                  >
                    Pick up
                  </button>
                </div>
                
                <textarea
                  placeholder="Any special instructions? (e.g., extra spicy, no onions)"
                  className="w-full bg-muted/50 border border-border/50 rounded-xl p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">{formatNaira(totalPrice)}</span>
            </div>
            {deliveryType === 'delivery' && (
              <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <span>Delivery Fee</span>
                <span>Calculated on WhatsApp</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-6 pt-2 border-t border-border/50">
              <span className="font-bold text-lg">Total</span>
              <span className="font-display font-bold text-2xl text-primary">{formatNaira(totalPrice)}</span>
            </div>
            
            <Button 
              className="w-full h-14 rounded-full text-lg font-bold bg-green-500 hover:bg-green-600 text-white gap-2 shadow-lg shadow-green-500/20"
              onClick={handleCheckout}
            >
              Checkout on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Button>
            <div className="flex justify-center mt-3">
               <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive uppercase tracking-widest font-bold">
                  Clear Cart
               </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
