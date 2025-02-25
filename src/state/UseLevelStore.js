import { create } from 'zustand';


import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './Storage'; // Make sure this path is correct
import { initialLevelData } from '../utils/data'; // Make sure this path is correct

export const useLevelStore = create(
  persist(
    (set, get) => ({
      levels: initialLevelData,
      unlockLevel: (id) => {
        set((state) => {
          const updatedLevels = state.levels.map((level) =>
            level.id === id ? { ...level, unlocked: true } : level
          );
          return { levels: updatedLevels };
     
        });
      },
     
     
           
      
    
      completedLevel: (id, collectedCandies) => {
        set((state) => {
          const updatedLevels = state.levels.map((level) =>
            level.id === id
              ? { ...level, completed: true, highScore: Math.max(level.highScore, collectedCandies) }
              : level
          );
          return { levels: updatedLevels };
     
        });
      },
      
    }),





    
    {
      name: 'level-storage',
      storage: createJSONStorage(() => mmkvStorage),
   
    }
  )
);





















