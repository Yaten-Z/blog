---
title: "STM32 入门（01）：认识 STM32"
date: 2026-10-04
description: 从单片机是什么讲起，对比 51 与 STM32，拆解 STM32 命名规则，并介绍本系列使用的开发板与工具链。
category: stm32
tags: [STM32, 嵌入式, 单片机]
toc: true
mermaid: true
---

这是《STM32 基础入门系列》的第一篇。在动手写代码之前，先把“我们到底在玩什么”这件事说清楚：STM32 是什么、它和常见的 51 单片机差在哪、开发板型号里那串字母数字代表什么、以及后面的教程会用到哪些工具。

## 本篇目标

- 理解单片机（MCU）与 STM32 的关系
- 知道 STM32 相比 51 单片机的提升在哪里
- 能看懂 `STM32F103C8T6` 这串型号的含义
- 认识本系列使用的“蓝丸”开发板和必备工具
- 了解寄存器、标准库、HAL 库三种开发方式

## 一、单片机是什么

**单片机（Microcontroller, MCU）** 简单说就是“把一台电脑的核心部件塞进一颗芯片里”。它内部集成了：

- **CPU 内核**：负责运算和控制
- **存储器**：Flash（存程序）、SRAM（存运行时数据）
- **外设**：GPIO、串口、定时器、ADC、I2C、SPI 等
- **时钟与电源管理**：让各部分按节拍工作

和电脑 CPU 不同，单片机不需要操作系统也能跑得很稳，功耗低、体积小、价格便宜，因此广泛用于家电、玩具、仪器、机器人等。你玩过的 Arduino，本质上也是一块把单片机（AVR 或 ARM）和外围电路封装好的开发板。

## 二、从 51 到 STM32

很多人的第一块单片机是 **51（8051 内核）**。它经典、简单、资料多，但也确实老旧。下面粗略对比一下：

| 维度 | 51 单片机 | STM32 |
| --- | --- | --- |
| 位数 | 8 位 | 32 位 |
| 典型主频 | 12～24 MHz | 72 MHz（F1）～数百 MHz |
| 存储 | 几 KB Flash / 百余字节 RAM | 64 KB Flash / 20 KB SRAM（F103C8） |
| 外设 | 串口、定时器、少量 IO | 多路 USART/SPI/I2C/ADC/定时器/PWM/DMA... |
| 开发方式 | 寄存器为主 | 寄存器 / 标准库 / HAL 库 |
| 定位 | 入门教学 | 工业、消费电子主力 |

一句话：**STM32 更快、更强、外设更丰富，同时开发方式也更“现代”**。它基于 ARM 公司的 **Cortex-M 内核**，而 ST（意法半导体）给它配上自己的存储和外设，做成了 STM32 系列。

## 三、看懂 STM32 的命名

以本系列使用的型号为例：**STM32F103C8T6**。

![图片1](https://s1.imagehub.cc/images/2026/10/04/af0b12ce6fc41b43d96523658743d031.png)

- **STM32**：ST 的 32 位 MCU 家族
- **F**：产品类别，F=基础型（Foundation）；还有 L 低功耗、H 高性能、G 通用、W 无线等
- **103**：具体子系列，F103 是经典的“增强型”，内核为 Cortex-M3
- **C**：引脚数量，C 代表 48 脚（T=36、R=64、V=100、Z=144……）
- **8**：Flash 容量，8 代表 64 KB（6=32K、B=128K、C=256K、E=512K……）
- **T**：封装类型，T 代表 LQFP
- **6**：工作温度范围，6 表示 -40℃～85℃（工业级）

> 记住这个规则，以后看到 `STM32F407VET6`、`STM32F103ZET6` 也能快速判断它的档次和资源。

## 四、认识“蓝丸”STM32F103C8T6

本系列选用市面上最常见的 **STM32F103C8T6 最小系统板**，因外形是蓝色小板子，江湖人称 **“蓝丸”（Blue Pill）**。它的核心资源：

![5279536835 955195790](https://s1.imagehub.cc/images/2026/10/04/db6fae88e48cc6dedeaa16fb5198770d.jpg)

主要参数一览：

- **内核**：ARM Cortex-M3，最高 **72 MHz**
- **存储**：**64 KB** Flash，**20 KB** SRAM
- **供电**：2.0～3.6 V（板上有 3.3V 稳压）
- **接口**：3× USART、2× I2C、2× SPI、2× 12 位 ADC、多个 16 位定时器、USB、CAN、DMA
- **调试**：SWD（配合 ST-Link）
- **板载**：8 MHz 晶振、复位键、BOOT 跳线、若干 LED（PC13 用户灯）

> 注意：STM32 的 IO 是 **3.3V 电平**，不要直接接 5V 信号，否则可能损坏芯片；需要时用电平转换或串联电阻。

## 五、开发方式：寄存器、标准库、HAL

同样点亮一个 LED，有三种“写法层次”：

1. **寄存器**：直接读写内存地址里的寄存器位。效率最高、最贴近硬件，但可读性差、移植麻烦，适合进阶和抠性能。
2. **标准库（StdPeriph）**：ST 早期提供的函数库，对寄存器做了封装，曾经非常流行，但已停止更新。
3. **HAL 库（Hardware Abstraction Layer）**：ST 目前主推的库，跨系列可移植性好，配合 **STM32CubeMX** 图形化配置，能一键生成初始化代码，非常适合入门。

本系列的工具链是 **STM32CubeMX + Keil MDK-ARM + VSCode**，底层使用 **HAL 库**：

| 环节 | 工具 | 作用 |
| --- | --- | --- |
| 图形化配置 | STM32CubeMX | 配置时钟树与外设，一键生成 HAL 初始化代码和 Keil 工程骨架 |
| 编译 / 下载 / 调试 | Keil MDK-ARM（µVision） | 编译工程，配合 ST-Link 烧录程序并在线调试 |
| 编写代码 | VSCode | 配合 C/C++ 插件舒适地编写、阅读代码 |

这种“生成骨架 → 编译下载 → 专注编码”的分工，既保留了 CubeMX 的图形化便利，又能用自己顺手的编辑器。等基础打牢后，第 13 篇会带你了解如何过渡到 LL 库和寄存器。

## 六、需要准备的东西

**硬件**

- STM32F103C8T6 蓝丸开发板 ×1
- **ST-Link V2** 下载调试器 ×1（用于下载程序和在线调试）
- USB 转 TTL 串口模块 ×1（后面学串口会用到）
- 面包板 + 杜邦线 + LED + 电阻 + 按键（做实验用）

**软件**

- [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html)（免费，注册 ST 账号即可下载，负责生成初始化代码）
- [Keil MDK-ARM](https://www.keil.arm.com/)（安装时勾选 STM32F1xx Device Family Pack；免费版 MDK-Lite 有 32KB 代码上限，入门够用）
- [VSCode](https://code.visualstudio.com/) + 插件：C/C++；可选装 Keil Assistant 或 Cortex-Debug 辅助编辑与调试
- ST-Link 驱动（安装 STM32CubeProgrammer 或 ST-Link Utility 时通常会一并安装，也可单独下载）

**心态**

- 嵌入式很“接地气”：代码写得对不对，板子上的灯会立刻告诉你。多动手、多观察现象，比死记寄存器更有用。

## 七、小结与练习

本篇我们弄清楚了：

- 单片机是“芯片里的电脑”，STM32 是其中的 32 位代表
- STM32 相比 51：更快、外设更多、开发方式更现代
- `STM32F103C8T6` 各字段的含义
- 蓝丸的核心资源与本系列的开发方式（CubeMX + Keil + VSCode + HAL）

**动手练习**

1. 用自己的话复述 `STM32F407VET6` 型号各字段的含义（提示：V=100 脚，E=512KB Flash）。
2. 查一查 F103C8T6 的数据手册（Datasheet），找出它的工作电压范围和最大主频。

## 附：一段 STM32 代码先睹为快

后续每篇都会给出可直接运行的完整代码。这里先放一段最经典的“点灯”程序（HAL 库），让你提前感受一下 STM32 代码长什么样，也顺便测试一下本站的代码高亮效果：

```c title="main.c" showLineNumbers
#include "main.h"

// 板载 LED 接在 PC13
int main(void)
{
    HAL_Init();                          // 初始化 HAL 库
    SystemClock_Config();                // 配置系统时钟（72MHz）
    __HAL_RCC_GPIOC_CLK_ENABLE();        // 使能 GPIOC 时钟

    GPIO_InitTypeDef gpio = {0};
    gpio.Pin   = GPIO_PIN_13;
    gpio.Mode  = GPIO_MODE_OUTPUT_PP;    // 推挽输出
    gpio.Pull  = GPIO_NOPULL;
    gpio.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(GPIOC, &gpio);

    while (1)
    {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);  // 翻转 LED 电平
        HAL_Delay(500);                          // 延时 500ms
    }
}
```

看不懂没关系，第 02 篇我们会把这段代码一步步写出来、烧进板子。现在你只需要记住：**STM32 的代码，本质上就是在和 `GPIO`、`CLOCK` 这些“外设”打交道。**

## 系列目录（持续更新）

- 01 认识 STM32（本篇）
- 02 第一个工程：点亮 LED
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

下一篇，我们直接用 STM32CubeMX 新建第一个工程，写几行 HAL 代码点亮板载与外接 LED，并用 ST-Link 烧录。
