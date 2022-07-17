import { useStore } from 'vuex'
import { computed } from 'vue'


const useUI = () => {

  const store = useStore()

  return {
    
    isSideMenuOpen: computed({
      get() {
          return store.getters['ui/isSideMenuOpen']
      },
      set( val ) {
          store.commit('ui/toggleSideMenu')
      }
    }),
    toggleSideMenu() {
      store.commit('ui/toggleSideMenu')
    }

  }

}

export default useUI