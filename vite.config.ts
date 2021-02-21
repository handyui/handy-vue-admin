import { resolve } from 'path'
import type { UserConfig } from 'vite'
import dotenv from 'dotenv'

// 环境参数
export const loadEnv =()=> {
  const env = process.env.NODE_ENV;
  const ret: any = {};
  const envList = [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'];
  envList.forEach((e) => {
    dotenv.config({
      path: e,
    });
  });

  for (const envName of Object.keys(process.env)) {
    let realName = (process.env as any)[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

const viteEnv = loadEnv()

const {
  BASE_URL,
  TARGET,
  OUTPUT_DIR,
  PUBLIC_PATH
} = viteEnv;

console.log(BASE_URL, TARGET, OUTPUT_DIR, PUBLIC_PATH)

const Config: UserConfig = {
  alias: {
    '/@/': resolve(__dirname, './src')
  },
  // 引入第三方的配置
  // 会使用rollup对包重新编译，将编译成符合esm模块规范的新的包放入node_modules下的
  optimizeDeps: {
    include: [
      'echarts',
      'ant-design-vue',
      '@ant-design/icons-vue',
      // '@ant-design/colors',
      // "axios"
    ],
  },
  // esbuildTarget: 'es2019',
/*  
  port: '9000',
  // 是否自动在浏览器打开
  open: false,
  // 是否开启 https
  https: false,*/
  // port: 3000,
  // hostname: "localhost",
  outDir: OUTPUT_DIR,
  base: PUBLIC_PATH,  // 相当于publicPath assetsDir
  proxy: {
  // '/api': 'http://localhost:3001', // 本地测试可以用这个
    '/api': {
        target: TARGET,
        changeOrigin: true,  // 解决跨域问题
        ws: false,
        rewrite: path => path.replace(/^\/api/, '')
    }
  }
}


export default Config