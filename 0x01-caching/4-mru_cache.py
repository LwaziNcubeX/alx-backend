#!/usr/bin/python3
"""
Module for MRU cache that inherits from BaseCaching
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRU (Most Recently Used) Cache"""

    def __init__(self):
        """Initialize the MRU cache with default"""
        super().__init__()
        self.mru_queue = []

    def put(self, key, item):
        """Add an item to the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.mru_queue.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            mru_key = self.mru_queue.pop()
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

        self.mru_queue.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """Retrieve item from cache"""
        if key is None or key not in self.cache_data:
            return None

        self.mru_queue.remove(key)
        self.mru_queue.append(key)

        return self.cache_data[key]
