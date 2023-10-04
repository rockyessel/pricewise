'use server';

import { extractCurrency, extractDescription, extractPrice } from '@/lib/utils';
import axios from 'axios';
import { load } from 'cheerio';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 2222;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: String(process.env.BRIGHT_DATA_HOST),
    port,
    rejectUnauthorized: false,
  };

  try {
    // fetch product page
    const response = await axios.get(url, options);
    const $ = load(response.data);

    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('a-button-selected a.color-base')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageURLs = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'));

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

    const description = extractDescription($);

    const data = {
      url,
      currency: currency || '$',
      image: imageURLs[0],
      title,
      description,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      category: 'Category',
      reviewCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      discountRate: Number(discountRate),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      hightestPrice: Number(originalPrice) || Number(currentPrice),
    };

    // console.log(data);

    return data
  } catch (error: any) {
    throw new Error(`Failed to scrape the web ${error.message}`);
  }
}
