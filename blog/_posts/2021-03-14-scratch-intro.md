---
title: Scratch 项目简介
date: 2021-03-14
tags:
  - Scratch
author: preper
summary: 介绍一下 Scratch 相关的仓库
---

## 什么是 Scratch

Scratch是美国麻省理工学院的“终身幼儿园团队”开发的一款图形化编程工具，通过点击并拖拽的方式就能完成编程，可以帮助儿童或成人初学者更好地学习编程的基础概念。
2007年，Scratch1.0公开发布，随后在2012年又推出了Scratch2.0，而Scratch3.0则是2019年的1月正式推出的。
Scratch 3.0 采用了HTML5和JavaScript技术来编写，支持所有的现代浏览器和WebGL。

## Scratch “家族”

Scratch在github上有一系列的开源项目，其官方的开发者账号为[LLK](https://github.com/LLK)。
点开这个账号的主页可以发现，相关的仓库一共有55个。
虽然其中的多数或者已经不再维护，或者已经是稳定版不需要频繁更新，但依然有很多的仓库依然很活跃。
下面就来介绍一下，在当前2021年，仍然活跃的Scratch相关的仓库。

### Scratch 核心库

* [scratch-gui](https://github.com/LLK/scratch-gui)
用于创建和运行 Scratch 3.0 项目的图形用户界面，是一个基于 react + redux 的 web 项目。
将这个仓库 clone 并运行之后，就能得到一个运行于本地的 scratch 网页。
目前市面上大多数应用 scratch 开发图形化编程的项目，都是基于此项目进行换皮、定制化二次开发而来。
也可以推断出，哪怕是相关的 app，scratch 也都是运行于 webview 环境的。
这种二次开发，虽然一些定制化功能也需要阅读并修改一些依赖库的源码，但大部分的功夫还是只需要花在这个项目上就足够了。
* [scratch-blocks](https://github.com/LLK/scratch-blocks)
用于构建创意计算接口的库，核心库之一，scratch 积木块的源码都在这里。
不仅仅实现了块的样式、拖拽、拼接、创建、删除，还会在以上各个阶段抛出自定义事件，同步给其他库。
由于复用了 google [blockly](https://github.com/google/blockly) 的源码，所以代码看起来和现在的 js 包有一定区别。
* [scratch-render](https://github.com/LLK/scratch-render)
用于 Scratch 3.0 的基于 WebGL 的呈现引擎，核心库之一，实现 scratch 编辑器中舞台的绘制，控制各种抽象对象绘制在舞台上的移动、旋转等。
* [scratch-vm](https://github.com/LLK/scratch-vm)
用于表示，运行和维护 Scratch 3.0 程序状态的虚拟机，核心库之一，可以称之为核心中的核心。
内部会将 scratch-blocks 里的积木块和对应的抽象事件进行绑定，同时会接收其发送来的积木块的创建、拼接等事件的广播，在内部拼装出虚拟块对象。
触发积木块的运行条件时会在内部执行对应的抽象事件，调用对应的 scratch-render 提供的绘制 api 来修改舞台上抽象角色的信息。
* [scratch-paint](https://github.com/LLK/scratch-paint)
Scratch 3.0 的绘画编辑器，与 scratch 的运行机制关系并不大。
它的功能很强大，需要在 web 端实现画板功能的话可以学习一下这个仓库的源码。
* [scratch-storage](https://github.com/LLK/scratch-storage)
加载和存储 Scratch 3.0 的项目和资产文件，核心库之一。
实际加载和存储 .sb3 文件的方法都被封装在了 scratch-vm 中，这个仓库更多的是承载了存储资源文件（图片、音频等）的任务。

### 其他库

* [scratch-www](https://github.com/LLK/scratch-www)
Scratch 的独立 Web 客户端。
* [scratch-l10n](https://github.com/LLK/scratch-l10n)
用来收集提交给 Transifex 上的 Scratch 项目的翻译的仓库。
所以想要贡献翻译支持，请到[Transifex](https://www.transifex.com/llk/public)。
* [scratchjr](https://github.com/LLK/scratchjr)
使用 ScratchJr，幼儿（5至7岁）可以编写自己的互动故事和游戏。
面向低龄儿童的 scratch 项目，没有 web 端，只有对应的 android 和 iOS app。
由于标准版的 scratch 文字很多，低龄儿童很难上手，所以 scratch 项目组推出了这个项目来满足低龄儿童的需求。
* [scratchr2_translations](https://github.com/LLK/scratchr2_translations)
Scratch 2.0 网站的翻译，scratch2.0 网站的多语言支持项目。
* [scratch-sb1-converter](https://github.com/LLK/scratch-sb1-converter)
在 JS 中将 Scratch .sb 文件（Scratch 1）转换为 .sb2（Scratch 2）。
scratch 3.0 支持运行 .sb2 文件，这个仓库则是使 scratch 可以继续向下兼容的项目。
* [scratch-svg-renderer](https://github.com/LLK/scratch-svg-renderer)
Scratch SVG 渲染器，用来在 scratch 项目内渲染 svg 的仓库。
* [scratch-desktop](https://github.com/LLK/scratch-desktop)
将 Scratch 3.0 封装为独立的桌面应用程序，一个类似于 scratch-gui 的项目，两者之间的区别是运行环境不同，分别在桌面系统和浏览器环境运行。
* [scratchjr-website](https://github.com/LLK/scratchjr-website)
Scratch Jr 网站的代码，并不包含 Scratch Jr 编辑器。
* [scratch-audio](https://github.com/LLK/scratch-audio)
适用于 Scratch 3.0 的基于 Web 音频的音频引擎，播放 Scratch 中的音频的仓库。
* [scratch-analysis](https://github.com/LLK/scratch-analysis)
分析工具，用于概述 Scratch 程序的结构，组成和复杂性。
* [eslint-config-scratch](https://github.com/LLK/eslint-config-scratch)
Scratch 的可共享 ESLint 配置。
* [scratch-resources](https://github.com/LLK/scratch-resources)
将源文件和图像编译为 Scratch 素材的编译器。
* [scratchx](https://github.com/LLK/scratchx)
Scratch Extension 网站。于今年（2021-02-24）宣布，不再维护。
* [scratch-parser](https://github.com/LLK/scratch-parser)
Scratch 项目的验证和解析，格式化 .sb3 文件中的 project.json 文件的项目。
* [scratch-link](https://github.com/LLK/scratch-link)
Windows 和 MacOS 的设备互通性层。

当然，未列出的仓库也并不一定是被弃用（就好比scratchx，今年的更新居然是弃用声明。。挺讽刺的），也可能是作为一个稳定的版本，不需要增加功能也暂时没有发现 bug 而已。

## 来自 2022 的结语

去年挖了个大坑，今年来看，应该是填不上了，所以文章的标题也改为了简介。
我从 Scratch 这个项目中学到了很多，和它相关的这个需求，应该也是我从业以来最难的工作。
做完了这个项目不久，我也接连的迎来了人生中的多个转折点，心态也发生了很大的变化，当然，已经和 Scratch 无关了。
网上关于 Scratch 的介绍很少，能搜到的我几乎都看了一遍，但作用有限，所以这也成了我第一个硬着头皮读源码的开源项目。
感觉 scratch-vm 的源码现在拿过来我还是知道哪块是干什么的。
希望后续还能有大块的时间阅读源码，下一个先从 webpack 开始吧。
