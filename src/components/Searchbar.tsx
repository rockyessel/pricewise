'use client';
import { scrapeAndStoreProduct } from '@/lib/actions';
import React from 'react';

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes('amazon.com') ||
        hostname.includes('amazon.') ||
        hostname.includes('amazon')
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert('Please provide a valid amazon link');
    }

    try {
      setIsLoading(true);

      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type='text'
        value={searchPrompt}
        onChange={(event) => setSearchPrompt(event.target.value)}
        placeholder='Enter product link'
        className='searchbar-input'
        // disabled={searchPrompt === ''}
      />

      <button type='submit' className='search-btn'>
        {isLoading ? 'Searching' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
