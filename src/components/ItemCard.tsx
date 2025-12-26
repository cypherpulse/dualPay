import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BitcoinSymbol } from './BitcoinIcon';
import { shortenAddress, formatMicroUnits, stxToSbtc } from '@/lib/stacks';
import { ShoppingCart, Package, User } from 'lucide-react';

export interface MarketItem {
  id: number;
  name: string;
  desc: string;
  price: bigint;
  quantity: bigint;
  seller: string;
  active: boolean;
}

interface ItemCardProps {
  item: MarketItem;
  onBuy: (item: MarketItem) => void;
}

export function ItemCard({ item, onBuy }: ItemCardProps) {
  console.log('ItemCard item:', item);
  console.log('item.name:', item.name, 'type:', typeof item.name);
  const isAvailable = Number(item.quantity) > 0; // Ignore active for now, assume true
  console.log('isAvailable:', isAvailable, 'active:', item.active, 'quantity:', Number(item.quantity));

  return (
    <Card className="card-glow overflow-hidden group animate-slide-up">
      {/* Gradient top bar */}
      <div className="h-1 bg-gradient-bitcoin" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <Badge 
            variant={isAvailable ? "default" : "secondary"}
            className={isAvailable ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
          >
            {isAvailable ? 'Available' : 'Sold Out'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {item.desc}
        </p>

        {/* Price Display */}
        <div className="space-y-2 p-3 rounded-lg bg-secondary/50 border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Price in STX</span>
            <span className="text-lg font-bold text-foreground">
              {formatMicroUnits(item.price)} STX
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              ≈ sBTC <BitcoinSymbol className="text-primary" size={12} />
            </span>
            <span className="text-sm font-medium text-primary">
              {stxToSbtc(item.price)} sBTC
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            <span>Qty: {item.quantity.toString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{shortenAddress(item.seller)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={() => onBuy(item)}
          disabled={!isAvailable}
          className="w-full btn-bitcoin"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAvailable ? 'Buy Now' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
}
