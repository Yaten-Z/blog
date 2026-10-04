---
title: "STM32 入门（02）：第一个工程——点亮 LED"
date: 2026-10-04
description: 用 STM32CubeMX 新建工程、配置时钟与 GPIO，生成 Keil 工程，写几行 HAL 代码点亮蓝丸板载 LED 和外接 LED。
category: stm32
tags: [STM32, 嵌入式, HAL, GPIO, Keil]
toc: true
mermaid: true
---

第 01 篇我们认识了 STM32 和“蓝丸”。这一篇不再讲安装（工具链装不好先回去看第 01 篇的软件清单），直接动手：**用 CubeMX 建出第一个工程，写几行代码，让板子上的灯闪起来**。

嵌入式最爽的一点就是——代码对不对，灯会告诉你。我们先把这盏灯点亮。

## 本篇目标

- 用 STM32CubeMX 新建一个 STM32F103C8T6 工程
- 配置系统时钟到 72 MHz，把 PC13、PA5 配成输出
- 生成 Keil MDK-ARM 工程并看懂目录结构
- 写 HAL 代码点亮板载 LED 与面包板外接 LED
- 用 ST-Link 编译、下载、观察现象

## 一、整体流程

整个“点灯”走下来就是这条链：

1. STM32CubeMX<br/>配置时钟 / 引脚  
2. 生成 MDK-ARM 工程  
3. 编辑 Core/Src/main.c  
4. Keil 编译 Build  
5. ST-Link 下载  
6. LED 闪烁

CubeMX 负责“搭骨架”，我们只往骨架里填业务代码，最后交给 Keil 编译下载。

## 二、CubeMX 新建工程

### 1. 选芯片、存工程

打开 STM32CubeMX，点 **File → New Project**（此过程可能需要安装文件，耐心等待），在搜索框输入 `STM32F103C8`，在列表里选中 **STM32F103C8Tx**，双击进入配置界面。

![e2a0406c 4901 4dd9 8275 18d6f6def83b](https://s1.imagehub.cc/images/2026/10/04/e2f22548fb0a8d9d95989725229a2c06.png)

![956011c9 118f 4b6c b215 4ed5c183d05b](https://s1.imagehub.cc/images/2026/10/04/25e6048524c0e6d271e1d561f67fa444.png)

> :::caution[路径别用中文]
> 保存 `.ioc` 时，**工程路径千万不要带中文、空格或特殊符号**，否则 Keil 编译时会出现找不到文件、路径乱码等一堆玄学问题。建议统一放在 `D:\stm32\` 这类纯英文目录下。

### 2. 配置调试口与晶振

先到左侧 **System Core** 里做两件“保命”设置：

- **SYS → Debug** 选 **Serial Wire**（一定要选！否则程序下载一次后 SWD 口被占用，下次就再也连不上芯片了）
- **RCC → HSE** 选 **Crystal/Ceramic Resonator**（蓝丸板载了 8 MHz 晶振）

![de6e6e5d 15ce 4269 b29a 6ec819bb4279](https://s1.imagehub.cc/images/2026/10/04/e182551810556286858e2425aa22ff61.png)

![image](https://s1.imagehub.cc/images/2026/10/04/9fd1e11c78ecbed31d183169dff92457.png)

### 3. 配置 GPIO

在中间的芯片图上找到 **PC13**，左键点击选 **GPIO_Output**；再找到 **PA5**，同样选 **GPIO_Output**。

![image](https://s1.imagehub.cc/images/2026/10/04/4dff83a2e08b13a6f3e3a97d9ed42443.png)

![image](https://s1.imagehub.cc/images/2026/10/04/8695231c641d887df9124599bd8d3f13.png)

然后到 **GPIO** 标签页，把两个引脚改成好记的名字：

| 引脚 | 模式 | User Label | 初始电平 | 说明 |
| --- | --- | --- | --- | --- |
| PC13 | GPIO_Output | `LED` | High | 板载 LED，**低电平点亮** |
| PA5 | GPIO_Output | `LED_EXT` | Low | 外接 LED，**高电平点亮** |

![45b9e7bc 6b82 4b2a 933f d6014cb6633e](https://s1.imagehub.cc/images/2026/10/04/dc9932e6862cb6ca43acc04d8e9fe502.png)

![image](https://s1.imagehub.cc/images/2026/10/04/a76e6aa662f117cbb26e7af0390dad2d.png)

初始电平这样设，是为了让两块 LED 一上电都处于“熄灭”状态。CubeMX 会根据 `User Label` 自动生成 `LED_Pin`、`LED_GPIO_Port` 这样的宏，写代码时不用记引脚号。

### 4. 配置时钟树

切到 **Clock Configuration** 标签页：

- **Input frequency** 填 `8`（板载晶振频率）
- **PLL Source** 选 `HSE`
- **PLLMul** 选 `×9`
- **System Clock Mux** 选 `PLLCLK`
- 确认 **HCLK (MHz)** 显示 **72**
- **APB2 Prescaler** 选 `/2`

![image](https://s1.imagehub.cc/images/2026/10/04/e76b3c17a92e9156dbe30f4cbbaabd90.png)

### 5. 工程设置并生成

切到 **Project Manager** 标签页：

- **Project Name** 填 `led_blink`，**Project Location** 选纯英文路径
- **Toolchain / IDE** 选 **MDK-ARM**，版本选你装的那一版（常见 V5）
- **Code Generator** 里勾上 **Copy only the necessary library files**（只复制用到的库文件，工程更小）

最后点右上角 **GENERATE CODE**。看到 “Generation completed” 就成功了。

![image](https://s1.imagehub.cc/images/2026/10/04/fd10f8f6c43391c9d9a2c3359c98b11e.png)

![image](https://s1.imagehub.cc/images/2026/10/04/ffd00964535ed3298d27bb01335dcd75.png)

## 三、生成的工程长什么样

生成目录大致如下：

```text title="工程目录" showLineNumbers
led_blink/
├── led_blink.ioc          # CubeMX 工程文件，双击可重新配置
├── Core/
│   ├── Inc/               # 头文件：main.h、gpio.h、stm32f1xx_hal_conf.h ...
│   └── Src/               # 源文件：main.c、gpio.c、系统启动相关
├── Drivers/
│   ├── CMSIS/             # ARM 内核接口
│   └── STM32F1xx_HAL_Driver/  # HAL 库源码
└── MDK-ARM/               # Keil 工程目录（.uvprojx 在这里）
    └── led_blink.uvprojx
```

有两点要记牢：

1. **真正要改的只有 `Core/Src/main.c`**，其余多是 CubeMX / HAL 自动维护的。
2. `main.c` 里到处是成对的注释，形如：

```c
/* USER CODE BEGIN xxx */

/* USER CODE END xxx */
```

**自己写的代码一定要放在这对注释之间**。因为以后回到 CubeMX 改了配置、重新生成代码时，CubeMX 只保留 `USER CODE` 区间里的内容，写在别处的代码会被覆盖。

`main.c` 里几个关键函数先混个脸熟：

- `HAL_Init()`：初始化 HAL 库与 SysTick 时基
- `SystemClock_Config()`：按时钟树配置 72 MHz
- `MX_GPIO_Init()`：按引脚配置初始化 GPIO
- `main()`：主函数，里面永远跑着 `while (1)` 死循环

## 四、写点灯代码

用 VSCode 或 Keil 打开 `Core/Src/main.c`，找到 `main()` 里的这段：

```c
/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
}
```

在 `USER CODE BEGIN WHILE` 和 `USER CODE END WHILE` 之间填入三行：

```c
HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);          // 翻转板载 LED（PC13）
HAL_GPIO_TogglePin(LED_EXT_GPIO_Port, LED_EXT_Pin);  // 翻转外接 LED（PA5）
HAL_Delay(500);                                      // 等 500 ms
```

- `HAL_GPIO_TogglePin(端口, 引脚)`：把该引脚电平翻转一次。500 ms 翻一次，就是 1 秒眨眼半周期。
- `HAL_Delay(ms)`：HAL 提供的毫秒级阻塞延时。

改完的 `main.c`（省略 CubeMX 自动生成的注释与 `Error_Handler`）如下：

```c title="Core/Src/main.c" showLineNumbers
#include "main.h"

void SystemClock_Config(void);
static void MX_GPIO_Init(void);

int main(void)
{
    HAL_Init();                 // 初始化 HAL 库与 SysTick
    SystemClock_Config();       // 配置系统时钟（72MHz）
    MX_GPIO_Init();             // 初始化引脚（PC13、PA5）

    /* USER CODE BEGIN WHILE */
    while (1)
    {
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);          // 板载 LED：低电平点亮
        HAL_GPIO_TogglePin(LED_EXT_GPIO_Port, LED_EXT_Pin);  // 外接 LED：高电平点亮
        HAL_Delay(500);                                      // 延时 500ms
        /* USER CODE END WHILE */
    }
}

// 配置 72MHz：HSE 8MHz -> PLL x9 -> SYSCLK
void SystemClock_Config(void)
{
    RCC_OscInitTypeDef RCC_OscInitStruct = {0};
    RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
    RCC_OscInitStruct.HSEState       = RCC_HSE_ON;
    RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
    RCC_OscInitStruct.HSIState       = RCC_HSI_ON;
    RCC_OscInitStruct.PLL.PLLState   = RCC_PLL_ON;
    RCC_OscInitStruct.PLL.PLLSource  = RCC_PLLSOURCE_HSE;
    RCC_OscInitStruct.PLL.PLLMUL     = RCC_PLL_MUL9;
    if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
    {
        Error_Handler();
    }

    RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK
                                | RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2;
    RCC_ClkInitStruct.SYSCLKSource   = RCC_SYSCLKSOURCE_PLLCLK;
    RCC_ClkInitStruct.AHBCLKDivider  = RCC_SYSCLK_DIV1;
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
    RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;
    if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
    {
        Error_Handler();
    }
}

// 初始化 PC13(LED) 与 PA5(LED_EXT) 为推挽输出
static void MX_GPIO_Init(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    __HAL_RCC_GPIOC_CLK_ENABLE();   // 使能 GPIOC 时钟
    __HAL_RCC_GPIOA_CLK_ENABLE();   // 使能 GPIOA 时钟

    HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);       // 板载 LED 默认灭（高电平）
    HAL_GPIO_WritePin(LED_EXT_GPIO_Port, LED_EXT_Pin, GPIO_PIN_RESET); // 外接 LED 默认灭（低电平）

    GPIO_InitStruct.Pin   = LED_Pin;
    GPIO_InitStruct.Mode  = GPIO_MODE_OUTPUT_PP;   // 推挽输出
    GPIO_InitStruct.Pull  = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(LED_GPIO_Port, &GPIO_InitStruct);

    GPIO_InitStruct.Pin = LED_EXT_Pin;
    HAL_GPIO_Init(LED_EXT_GPIO_Port, &GPIO_InitStruct);
}
```

:::note[为什么两块灯的“亮”不一样？]
蓝丸板载 LED 接在 PC13，且是**低电平点亮**（引脚输出低电平时电流从 3.3V 经 LED 流入引脚）；而我们在面包板上外接的 LED 是**高电平点亮**。两块灯一对比，正好帮你理解 GPIO 的高低电平与极性。
:::

## 五、面包板外接 LED

板载 LED 只有一颗，接线不过瘾，我们再用面包板外接一颗。接线很简单：

```text
PA5 ──── 限流电阻 220Ω ~ 1kΩ ──── LED 阳极(长脚) ──── LED 阴极(短脚) ──── GND
```

- LED 的**长脚是阳极**，接向 PA5 一侧；**短脚是阴极**，接 GND。
- 电阻**必须串联**在回路里，作用是限制电流。少了它，LED 瞬间烧毁，甚至可能把 IO 口打坏。

:::caution[一定要串限流电阻]
STM32 单个 IO 的最大输出电流约 20 mA。5V 直驱 LED 的时代已经过去，接 LED 请老老实实串一个 220Ω～1kΩ 的电阻。这里 PA5 输出高电平，电流经电阻、LED 流到 GND，LED 点亮。
:::

两块 LED 的对照：

| | 板载 LED | 外接 LED |
| --- | --- | --- |
| 引脚 | PC13 | PA5 |
| 有效电平 | 低电平点亮 | 高电平点亮 |
| 是否需要外接 | 不需要 | 需电阻 + 面包板 |
| 上电初始 | 灭（High） | 灭（Low） |

## 六、编译与下载（Keil）

### 1. 打开并编译

打开 `MDK-ARM/led_blink.uvprojx`，按 **F7**（或点工具栏的 Build 图标）编译。底部 Build Output 显示 `0 Error(s), 0 Warning(s)` 即成功。

### 2. 连接 ST-Link

把 ST-Link 与蓝丸用杜邦线连好（4 根）：

| ST-Link | 蓝丸 |
| --- | --- |
| 3.3V | 3.3V |
| SWDIO | DIO（SWDIO） |
| SWCLK | CLK（SWCLK） |
| GND | GND |

### 3. 配置下载器

点 **Options for Target**（魔术棒图标，快捷键 **Alt+F7**）：

- **Debug** 标签页 → 右上角 **Use** 选 **ST-Link Debugger**
- 点旁边的 **Settings** → **Debug** 页把 **Port** 设为 **SW**（Serial Wire），能识别到芯片 ID 就说明连上了
- 切到 **Flash Download** 页 → 勾选 **Reset and Run**（下载完自动复位运行，省得每次按复位键）

### 4. 下载

按 **F8**（Download）。成功后板子上两颗 LED 应该同时以 1 秒为周期交替亮灭。如果没有，先别怀疑人生，看下一节的排查表。

## 七、VSCode 怎么配合

Keil 用来编译下载，但它的编辑器比较“复古”。日常写代码可以用 VSCode：

1. 用 VSCode **打开工程根目录**（`led_blink` 文件夹，不是单个 `.c` 文件）
2. 装 **C/C++** 扩展，获得语法高亮、跳转与提示
3. 可选装 **Keil Assistant** 扩展，直接在 VSCode 里触发生成、编译、下载

编辑保存后回到 Keil 按 F7 编译即可。也可以只用 VSCode 看代码、改代码，编译下载交给 Keil。

## 八、常见问题排查

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 板载 LED 不亮或常亮 | 极性理解反了 | PC13 是低电平点亮，确认初始电平和翻转逻辑 |
| 外接 LED 不亮 | LED 接反 / 没串电阻 / 接错脚 | 长脚接 PA5 侧，短脚接 GND，确认 PA5 有输出 |
| 下载一次后再也连不上 | SYS 的 Debug 没设成 Serial Wire | 回 CubeMX 设置后重新生成，必要时用 BOOT0 拉高进系统存储器擦除 |
| Keil 提示找不到 ST-Link | 驱动没装 / 接线松 / 没供电 | 装 ST-Link 驱动，检查 4 根线，确认板子通电 |
| 编译报“找不到 stm32f1xx.h”等 | 路径带中文或库没生成全 | 改纯英文路径；CubeMX 里勾选复制必要库文件后重新生成 |
| 提示缺少器件 | 没装器件包 | Keil 的 Pack Installer 里安装 **STM32F1xx Device Family Pack** |
| 下载后没反应 | 没勾 Reset and Run | Flash Download 里勾上，或手动按板子复位键 |

## 九、小结与练习

这一篇我们跑通了完整链路：

- 用 CubeMX 完成芯片选型、时钟（72 MHz）、GPIO（PC13 / PA5）配置并生成 Keil 工程
- 认识了工程目录，记住了“只在 `USER CODE` 区间写代码”
- 用 `HAL_GPIO_TogglePin` + `HAL_Delay` 让两颗 LED 闪烁
- 用 ST-Link 完成编译下载

**动手练习**

1. 把 `HAL_Delay(500)` 改成 `100`，观察闪烁节奏变快。
2. 让外接 LED 常亮：在 `USER CODE BEGIN 2` 里写 `HAL_GPIO_WritePin(LED_EXT_GPIO_Port, LED_EXT_Pin, GPIO_PIN_SET);`。
3. 让两颗 LED 交替闪（一亮一灭），提示：给其中一颗的翻转加个取反，或错开写入 `GPIO_PIN_SET` / `GPIO_PIN_RESET`。

## 系列目录（持续更新）

- 01 认识 STM32
- 02 第一个工程：点亮 LED（本篇）
- 03 工程解剖：目录、启动流程与时钟树
- 04 GPIO 输入输出
- 05 中断与 EXTI
- 06 定时器与 PWM
- 07 串口通信 UART
- 08 I2C 总线
- 09 SPI 总线
- 10 ADC 模数转换
- 11 DMA 与内存
- 12 综合实战：环境监测小站
- 13 调试技巧与进阶路线

下一篇，我们把这篇生成的工程“拆开看看”：启动文件、链接脚本、`SystemClock_Config` 到底做了什么，以及时钟树为什么是这样。
