import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  return (
    <Link href={`/products/${props.product._id}`} className='product-card'>
      <div className='product-card_img-container'>
        <Image
          src={props.product.image}
          alt={props.product.title}
          width={200}
          height={200}
          className='product-card_img'
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='product-title'>{props.product.title}</h3>

        <div className='flex justify-between'>
          <p className='text-black opacity-50 text-lg capitalize'>
            {props.product.category}
          </p>

          <p className='text-black text-lg font-semibold'>
            <span>{props.product.currency}</span>
            <span>{props.product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
