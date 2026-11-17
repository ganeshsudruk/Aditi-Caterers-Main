import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const MenuSelectionContext = createContext(null);

const STORAGE_KEY = 'aditi_selected_menu_items';

export function MenuSelectionProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems));
    } catch (e) {
      console.warn('Unable to persist menu selection to localStorage', e);
    }
  }, [selectedItems]);

  const addItem = useCallback((item) => {
    if (!item || !item.id) return;
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    if (!itemId) return;
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const toggleItem = useCallback((item) => {
    if (!item || !item.id) return;
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const isItemSelected = useCallback((itemId) => {
    if (!itemId) return false;
    return selectedItems.some((i) => i.id === itemId);
  }, [selectedItems]);

  const clearMenu = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const selectedCount = selectedItems.length;

  // Group items by category for review
  const groupedByCourse = useMemo(() => {
    const groups = {};
    selectedItems.forEach((item) => {
      const cat = item.categorySlug || item.categoryId || 'other';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }, [selectedItems]);

  const value = useMemo(
    () => ({
      selectedItems,
      selectedCount,
      addItem,
      removeItem,
      toggleItem,
      isItemSelected,
      clearMenu,
      groupedByCourse,
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [
      selectedItems,
      selectedCount,
      addItem,
      removeItem,
      toggleItem,
      isItemSelected,
      clearMenu,
      groupedByCourse,
      isDrawerOpen,
    ]
  );

  return (
    <MenuSelectionContext.Provider value={value}>
      {children}
    </MenuSelectionContext.Provider>
  );
}

export function useMenuSelection() {
  const context = useContext(MenuSelectionContext);
  if (!context) {
    throw new Error('useMenuSelection must be used within a MenuSelectionProvider');
  }
  return context;
}

export default MenuSelectionContext;
