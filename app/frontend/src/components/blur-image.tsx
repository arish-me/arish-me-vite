import { forwardRef, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

type ImageProps = {
  imageClassName?: string;
  lazy?: boolean;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
} & React.ComponentPropsWithoutRef<'img'>;

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-20 w-20',
  '2xl': 'h-24 w-24',
  '3xl': 'h-32 w-32',
  '4xl': 'h-40 w-40',
};

export const BlurImage = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    alt,
    src,
    className,
    imageClassName,
    lazy = true,
    fallbackText = 'Fallback',
    size = 'md',
    ...rest
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Avatar className={cn('overflow-hidden', sizeClasses[size], isLoading && 'animate-pulse', className)}>
      <AvatarImage
        ref={ref}
        className={cn(isLoading && 'scale-[1.02] blur-xl grayscale', 'object-cover', imageClassName)}
        style={{
          transition: 'filter 700ms ease, transform 150ms ease'
        }}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        onLoad={() => {
          setIsLoading(false);
        }}
        {...rest}
      />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
});

BlurImage.displayName = 'BlurImage';