// =============================================================
// 理论笔记（低压电工 · 知识点整理）
// 在这里添加你的笔记：复制下面一个 {...} 对象，修改即可。
// 字段说明：
//   id      编号（唯一数字）
//   title   标题
//   date    日期（字符串，任意格式）
//   tag     分类标签（如「理论类」「安全类」）
//   color   标签圆点颜色（可省略，默认蓝 var(--blue)）
//   excerpt 摘要（列表页显示的一两句话）
//   body    正文（支持 HTML：<p> <h2> <h3> <ul> <ol> <li> <strong> <blockquote> <code> <pre> <table> <img> <figure>）
// =============================================================
window.NOTES = {
  meta: {
    title: '理论笔记',
    kicker: 'THEORY NOTES'
  },
  notes: [
    {
      id: 1,
      title: '绝对式与增量式旋转编码器',
      date: '2026-09-15',
      tag: '编码 · 传感器',
      color: 'var(--blue)',
      excerpt: '从视觉笔记逐区拆解旋转编码器：左下编码盘（格雷码）、右侧光学链路（光→0/1）、右下 A/B 正交脉冲，最后绝对式 vs 增量式一表对照。',
      body: [
        '<p>旋转编码器（Rotary Encoder）是一台把「机械角度」翻译成「数字代码」的机器。</p>',
        '<figure><img src="notes-encoder.png" alt="编码器视觉笔记原图"><figcaption>▲ 总图：左—编码盘 · 右—光学链路 · 下—A/B 脉冲</figcaption></figure>',
        '<h2>先看总图：四层结构</h2><p>整张图其实是四层问题：</p><ul><li><strong>机械运动</strong>：电机轴 / 转轴发生旋转。</li><li><strong>光学读取</strong>：LED 发光 → 透镜 / 狭缝 → 编码盘 → 光电传感器判断某轨道「亮 / 暗」。</li><li><strong>数字编码</strong>：多路 0/1；绝对式多条同心轨道构成位置码，重点是<strong>格雷码 Gray Code</strong>。</li><li><strong>数字处理</strong>：格雷码 → 普通二进制 → PLC / 驱动器解释成角度、位置。</li></ul><blockquote>记忆链条：机械角度 → 光学状态 → 电信号 0/1 → 编码 → 控制器解释 → 角度 / 位置</blockquote>',
        '<h2>左下 · 编码盘：一张「空间数字表」</h2><p>编码盘不是普通圆盘，而是一圈一圈<strong>同心轨道</strong>，每圈对应一个二进制位；它随轴一起转，固定不动的 LED 和光电传感器负责读它。</p>',
        '<div style="width:170px;height:170px;border-radius:50%;border:2px solid #141414;background:#fff;margin:14px auto;position:relative"><div style="position:absolute;top:14px;left:14px;right:14px;bottom:14px;border-radius:50%;border:10px dashed #141414"></div><div style="position:absolute;top:30px;left:30px;right:30px;bottom:30px;border-radius:50%;border:10px dashed #141414"></div><div style="position:absolute;top:46px;left:46px;right:46px;bottom:46px;border-radius:50%;border:10px dashed #141414"></div><div style="position:absolute;top:62px;left:62px;right:62px;bottom:62px;border-radius:50%;border:10px dashed #141414"></div><div style="position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;background:#d3202e;transform:translate(-50%,-50%)"></div></div>',
        '<p style="text-align:center;color:#6b6b6b;font-size:13px">同心轨道＝每一位 · 黑白＝0/1（外 → 内：高 → 低位）</p>',
        '<p>4 条轨道 → 2⁴ = 16 个位置状态；轨道越多，可区分的位置越多、分辨率越高。这正对应<strong>绝对式的核心：每个角度位置对应一个唯一编码</strong>。</p>',
        '<h2>右 · 光学链路：光怎么变成 0/1</h2><p>看右侧这条链：</p>',
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;justify-content:center;margin:14px 0;font-size:12.5px"><span style="background:#f2b90f;color:#141414;padding:4px 10px;border-radius:4px;font-weight:700">LED</span><span style="color:#999">→</span><span style="background:#f2b90f;color:#141414;padding:4px 10px;border-radius:4px;font-weight:700">透镜</span><span style="color:#999">→</span><span style="background:#fff;color:#141414;padding:4px 10px;border-radius:4px;border:1px solid #141414;font-weight:700">编码盘</span><span style="color:#999">→</span><span style="background:#fff;color:#141414;padding:4px 10px;border-radius:4px;border:1px solid #141414;font-weight:700">狭缝</span><span style="color:#999">→</span><span style="background:#1f4fa3;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700">光电传感器</span><span style="color:#999">→</span><span style="background:#1f4fa3;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700">整形</span><span style="color:#999">→</span><span style="background:#141414;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700">0/1</span></div>',
        '<p>最底层一句话：<strong>光通过 → 光电器件状态变 → 电压变 → 整形 → 数字 0/1</strong>。</p>',
        '<h2>核心 · 为什么用格雷码，而不是普通二进制？</h2><p>普通二进制跳变时会<strong>同时改多位</strong>：0111 → 1000（4 位全变）。机械码盘切换瞬间各轨道不可能绝对同步，会短暂读到 0000 / 1111 等错误中间值，转得越快越明显。</p><p><strong>格雷码</strong>的核心：<strong>相邻码之间只改变 1 位</strong>，大幅降低边界读取错误。所以编码盘上的黑白图案直接按格雷码规律刻，读出来的就是格雷码。</p><pre>3 位格雷码：000 → 001 → 011 → 010 → 110 → 111 → 101 → 100 → 000</pre>',
        '<h2>格雷码 → 二进制（XOR 转换）</h2>',
        '<p>为什么要转？格雷码的优点是<strong>读取稳</strong>（相邻只变 1 位），但它不是「大小」编码——不能直接做加减、比较。控制器（PLC / 单片机）拿到格雷码后，要转回<strong>普通二进制</strong>，才能算角度、位置。一句话：<strong>格雷码管读取，二进制管计算</strong>。</p>',
        '<p>先记牢 XOR（异或）：<strong>相同为 0，不同为 1</strong>。</p>',
        '<pre>0 XOR 0 = 0\n0 XOR 1 = 1\n1 XOR 0 = 1\n1 XOR 1 = 0</pre>',
        '<p>转换规则（格雷码 → 二进制）：</p><ul><li><strong>最高位照抄</strong>：B3 = G3；</li><li><strong>其余每一位</strong>：本位二进制 = 更高一位的二进制 XOR 本位格雷码。</li></ul>',
        '<pre>B3 = G3\nB2 = B3 XOR G2\nB1 = B2 XOR G1\nB0 = B1 XOR G0</pre>',
        '<p>逐步演算（格雷码 <strong>1011</strong>）：</p>',
        '<pre>G  = 1  0  1  1\nB3 = 1          (照抄)\nB2 = 1 XOR 0 = 1\nB1 = 1 XOR 1 = 0\nB0 = 0 XOR 1 = 1\n→ 二进制 1101 = 13</pre>',
        '<p>4 位完整对照（格雷码 → 二进制 → 十进制）：</p>',
        '<table class="code-mini"><thead><tr><th>十进制</th><th>格雷码</th><th>二进制</th></tr></thead><tbody><tr><td>0</td><td>0000</td><td>0000</td></tr><tr><td>1</td><td>0001</td><td>0001</td></tr><tr><td>2</td><td>0011</td><td>0010</td></tr><tr><td>3</td><td>0010</td><td>0011</td></tr><tr><td>4</td><td>0110</td><td>0100</td></tr><tr><td>5</td><td>0111</td><td>0101</td></tr><tr><td>6</td><td>0101</td><td>0110</td></tr><tr><td>7</td><td>0100</td><td>0111</td></tr><tr><td>8</td><td>1100</td><td>1000</td></tr><tr><td>9</td><td>1101</td><td>1001</td></tr><tr><td>10</td><td>1111</td><td>1010</td></tr><tr><td>11</td><td>1110</td><td>1011</td></tr><tr><td>12</td><td>1010</td><td>1100</td></tr><tr><td>13</td><td>1011</td><td>1101</td></tr><tr><td>14</td><td>1001</td><td>1110</td></tr><tr><td>15</td><td>1000</td><td>1111</td></tr></tbody></table>',
        '<p>反向（二进制 → 格雷码）更简单：<strong>最高位照抄，其余位 = 本位二进制 XOR 上一位二进制</strong>（也就是 B 与「B 右移一位」做 XOR）。</p>',
        '<pre>G3 = B3\nG2 = B3 XOR B2\nG1 = B2 XOR B1\nG0 = B1 XOR B0</pre>',
        '<p>例：二进制 <strong>1101</strong> → 格雷码 <strong>1011</strong>。设计码盘、按黑白图案刻轨道时，就按这个方向算。</p>',
        '<p>这一套 XOR 逻辑在 PLC 里用异或门 / 梯形图实现——见文末研究清单第 2 条。</p>',
        '<h2>右下 · 增量式：A/B 正交脉冲</h2><p>增量式思路不同：不给每个位置唯一编号，而是产生<strong>连续脉冲</strong>，靠脉冲数量与相位关系算运动。</p>',
        '<svg viewBox="0 0 360 116" width="360" role="img" aria-label="A/B 正交波形" style="display:block;margin:14px auto;max-width:100%"><path d="M0 26 L0 10 H20 V26 H40 V10 H60 V26 H80 V10 H100 V26 H120 V10 H140 V26 H160 V10 H180 V26 H200 V10 H220 V26 H240 V10 H260 V26 H280 V10 H300 V26 H320 V10 H340 V26 H360" fill="none" stroke="#1f4fa3" stroke-width="2.5"/><path d="M0 76 L10 76 V60 H30 V76 H50 V60 H70 V76 H90 V60 H110 V76 H130 V60 H150 V76 H170 V60 H190 V76 H210 V60 H230 V76 H250 V60 H270 V76 H290 V60 H310 V76 H330 V60 H350 V76 H360" fill="none" stroke="#d3202e" stroke-width="2.5"/><text x="4" y="18" font-size="13" font-weight="bold" fill="#1f4fa3">A</text><text x="4" y="66" font-size="13" font-weight="bold" fill="#d3202e">B</text><text x="180" y="108" text-anchor="middle" font-size="11" fill="#6b6b6b">A、B 相差 90°（正交）：谁领先判方向 · 数脉冲算位移</text></svg>',
        '<p>正转 00 → 01 → 11 → 10 → 00；反转 00 → 10 → 11 → 01 → 00。</p>',
        '<h2>双线对照：绝对式 vs 增量式</h2><table><thead><tr><th>项目</th><th>绝对式</th><th>增量式</th></tr></thead><tbody><tr><td>位置表示</td><td>每个位置有唯一编码</td><td>靠脉冲累计</td></tr><tr><td>主要输出</td><td>多位代码（Gray Code）</td><td>A/B 脉冲（可有 Z 相）</td></tr><tr><td>断电定位</td><td>可直接读当前位置</td><td>仅靠脉冲无法知道累计位置</td></tr><tr><td>主要优势</td><td>不依赖从零累计</td><td>结构 / 接口较简单</td></tr><tr><td>主要风险</td><td>码盘 / 读取通道复杂</td><td>掉电或丢脉冲 → 累计误差</td></tr></tbody></table>',
        '<blockquote><strong>一句自动化语言：</strong>绝对式 = 把机械角度翻译成数字代码的机器；增量式 = 用周期性 A/B 脉冲的数量与相位判断运动量与方向。</blockquote><h2>下一步研究清单</h2><ol><li>4 位格雷码怎么从物理轨道刻出来；</li><li>Gray → Binary 的 XOR 电路，在 PLC 里如何用梯形图实现；</li><li>A/B/Z 三相与倍频计数。</li></ol>'
      ].join('')
    }
  ]
};
