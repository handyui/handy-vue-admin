import { onMounted, watch, onUnmounted, nextTick } from 'vue';
import echarts from 'echarts';
import { useStore } from "vuex";

type InitOptions = {
    devicePixelRatio?: number
    renderer?: string
    width?: number | string
    height?: number | string
};

type SetUpECharts = 'init' | 'connect' | 'disconnect' | 'getInstanceByDom' | 'registerMap' | 'getMap' | 'registerTheme';

type GraphicMethods = 'extendShape' | 'registerShape' | 'getShapeClass' | 'clipPointsByRect' | 'clipRectByRect';

type InstanceMethods = 'setOption' | 'getWidth' | 'getHeight' | 'getDom' | 'getOption' | 'resize' | 'dispatchAction' | 'on' | 'off' | 'convertToPixel' | 'convertFromPixel' | 'containPixel' | 'showLoading' | 'hideLoading' | 'getDataURL' | 'getConnectedDataURL' | 'appendData' | 'clear' | 'isDisposed' | 'dispose';

function useECharts<T extends { option: echarts.EChartOption }>(
    props: T,
    el: string,
    theme?: Object | string,
    opts?: InitOptions
): {
    manipulateChart: (property: InstanceMethods, ...args: any[]) => any,
    echartsMethods: (method: SetUpECharts, ...args: any[]) => any,
    echartsGraphicMethods: (method: GraphicMethods, ...args: any[]) => any
} {
    let chartProxy: echarts.ECharts | null;
    let chart 
    const { getters } = useStore()

    const draw=()=>{
        chart = echarts.init(
            document.getElementById(el) as HTMLDivElement,
            theme,
            opts
        );
        chart.setOption(props.option);
    }

    onMounted(() => {
        // nextTick(() => {})
            draw()
        
        chartProxy = new Proxy(chart, {
            get(target, property) {
                switch (property) {
                    case 'width':
                        return target['getWidth']();
                        
                    case 'height':
                        return target['getHeight']();
                        
                    case 'isDisposed':
                        return target['isDisposed']();
                        
                    case 'computedOptions':
                        return target['getOption']();

                    default:
                        return target[property];

                }
            }
        });

        window.addEventListener('resize', ()=>{
            manipulateChart('resize')
        })

    });

    onUnmounted(() => {
        chartProxy.dispose();
        chartProxy = null;

        window.removeEventListener('resize',()=>{
            manipulateChart('resize')
        })
    });

    function manipulateChart(property: InstanceMethods, ...args: any[]): any {
        return chartProxy ? chartProxy[property](...args) : null;
    }

    watch(() => props.option, (newOption: echarts.EChartOption) => {
        manipulateChart('setOption', newOption)
    });

    watch(() => getters.sideCollapsed, () => {
        setTimeout(()=>{
            manipulateChart('resize')
        }, 200)
    })

    function echartsGraphicMethods(method: GraphicMethods, ...args: any[]): any {
        return echarts.graphic[method](...args);
    }
    
    function echartsMethods(method: SetUpECharts, ...args: any[]): void {
        return echarts[method](...args);
    }

    return {
        manipulateChart,
        echartsMethods,
        echartsGraphicMethods
    };
}


export default useECharts