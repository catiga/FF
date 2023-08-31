import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { watch } from 'vue';
import { useStore } from '~/store';

export function useBasicLayout() {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller('sm')
    
    const app = useStore();
    
    watch(
        isMobile,
        newValue => {
            app.setIsMobile(newValue)
        },
        { immediate: true }
    );

    return {
        isMobile
    }
}