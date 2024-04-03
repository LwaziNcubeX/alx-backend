#!/usr/bin/python3
"""
Module for LRU Cache class
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRU (Least Recently Used) Cache"""

    def __init__(self):
        """Initialize the LRU Cache"""
        super().__init__()
        self.lru_queue = []

    def put(self, key, item):
        """Add an item to the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.lru_queue.remove(key)
        elif len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
            lru_key = self.lru_queue.pop(0)
            del self.cache_data[lru_key]
            print("DISCARD:", lru_key)

        self.lru_queue.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """Retrieve item from cache"""
        if key is None or key not in self.cache_data:
            return None

        self.lru_queue.remove(key)
        self.lru_queue.append(key)

        return self.cache_data[key]
