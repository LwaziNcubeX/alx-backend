#!/usr/bin/env python3
"""
A simple helper function to index pages
"""


def index_range(page, page_size):
    """
    A simple helper function to index pages
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index
