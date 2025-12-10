// 多功能工具集 JavaScript 功能实现

// 切换标签页功能
function switchTab(tabName, noHistory) {
    // 隐藏所有标签面板
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // 移除所有标签按钮的active类
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // 显示选中的标签面板
    document.getElementById(tabName + '-panel').classList.add('active');

    // 为选中的标签按钮添加active类
    const activeBtn = document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // 更新URL hash
    if (!noHistory) {
        window.location.hash = tabName;
    }

    // 如果是时间戳页面，更新当前时间戳
    if (tabName === 'timestamp') {
        updateCurrentTimestamp();
    }
}

// 更新当前时间戳
function updateCurrentTimestamp() {
    const now = new Date();
    const seconds = Math.floor(now.getTime() / 1000);
    const milliseconds = now.getTime();

    document.getElementById('currentSeconds').textContent = seconds;
    document.getElementById('currentMilliseconds').textContent = milliseconds;
}

// 时间戳转换为时间
function convertTimestampToTime() {
    const timestampInput = document.getElementById('timestampInput').value.trim();
    const timestampType = document.querySelector('input[name="timestampType"]:checked').value;
    const resultContent = document.querySelector('#timestampResult .result-content');

    if (!timestampInput) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入时间戳</span>';
        return;
    }

    let timestamp = parseInt(timestampInput);

    if (isNaN(timestamp)) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入有效的数字</span>';
        return;
    }

    // 根据选择的时间戳类型调整
    if (timestampType === 'seconds' && timestamp > 1000000000000) {
        resultContent.innerHTML = '<span style="color: #ef4444;">检测到毫秒级时间戳，请切换到毫秒级选项</span>';
        return;
    } else if (timestampType === 'milliseconds' && timestamp < 1000000000000) {
        resultContent.innerHTML = '<span style="color: #ef4444;">检测到秒级时间戳，请切换到秒级选项</span>';
        return;
    }

    // 如果是秒级时间戳，转换为毫秒
    if (timestampType === 'seconds') {
        timestamp *= 1000;
    }

    try {
        const date = new Date(timestamp);

        if (isNaN(date.getTime())) {
            resultContent.innerHTML = '<span style="color: #ef4444;">无效的时间戳</span>';
            return;
        }

        const formattedDate = formatDate(date);
        resultContent.innerHTML = `
            <div data-copy="${formattedDate.local}">${formattedDate.local}</div>
            <div data-copy="${formattedDate.utc}">${formattedDate.utc}</div>
            <div data-copy="${date.toISOString()}">${date.toISOString()}</div>
        `;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">转换失败：${error.message}</span>`;
    }
}

// 时间转换为时间戳
function convertTimeToTimestamp() {
    const timeInput = document.getElementById('timeInput').value.trim();
    const timestampType = document.querySelector('input[name="timestampType"]:checked').value;
    const resultContent = document.querySelector('#timestampResult .result-content');

    if (!timeInput) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入时间</span>';
        return;
    }

    try {
        // 尝试解析各种时间格式
        let date;
        if (timeInput.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
            // YYYY-MM-DD HH:mm:ss 格式
            date = new Date(timeInput.replace(' ', 'T') + 'Z');
        } else if (timeInput.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
            // ISO 格式
            date = new Date(timeInput);
        } else {
            // 其他格式尝试直接解析
            date = new Date(timeInput);
        }

        if (isNaN(date.getTime())) {
            resultContent.innerHTML = '<span style="color: #ef4444;">无法解析时间，请使用标准格式：YYYY-MM-DD HH:mm:ss</span>';
            return;
        }

        let timestamp = date.getTime();
        let resultText = '';

        if (timestampType === 'seconds') {
            timestamp = Math.floor(timestamp / 1000);
            resultText = `秒级时间戳：${timestamp}`;
        } else {
            resultText = `毫秒级时间戳：${timestamp}`;
        }

        resultContent.innerHTML = resultText;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">转换失败：${error.message}</span>`;
    }
}

// 格式化日期函数
function formatDate(date) {
    const localDate = new Date(date);
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const format = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return {
        local: format(localDate),
        utc: format(utcDate) + ' UTC'
    };
}

// 进制转换功能
function convertBase() {
    const input = document.getElementById('numberInput').value.trim();
    const inputBase = parseInt(document.querySelector('input[name="inputBase"]:checked').value);
    const resultContent = document.querySelector('#baseResult .result-content');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入数值</span>';
        return;
    }

    try {
        // 将输入转换为十进制
        let decimalValue;

        // 处理不同进制的输入
        if (inputBase === 16) {
            // 十六进制可能包含0x前缀
            const hexInput = input.replace(/^0x/i, '');
            decimalValue = parseInt(hexInput, 16);
        } else if (inputBase === 2) {
            // 二进制
            decimalValue = parseInt(input, 2);
        } else if (inputBase === 8) {
            // 八进制
            decimalValue = parseInt(input, 8);
        } else if (inputBase === 32) {
            // 三十二进制
            decimalValue = parseInt(input, 32);
        } else {
            // 十进制
            decimalValue = parseInt(input, 10);
        }

        if (isNaN(decimalValue)) {
            resultContent.innerHTML = '<span style="color: #ef4444;">无效的数值或进制转换失败</span>';
            return;
        }

        // 转换到各种进制
        const binary = decimalValue.toString(2);
        const octal = decimalValue.toString(8);
        const decimal = decimalValue.toString(10);
        const hex = decimalValue.toString(16).toUpperCase();
        const base32 = toBase32(decimalValue);

        // 显示转换结果
        resultContent.innerHTML = `
            <div data-copy="${binary}">二进制: ${binary}</div>
            <div data-copy="${octal}">八进制: ${octal}</div>
            <div data-copy="${decimal}">十进制: ${decimal}</div>
            <div data-copy="0x${hex}">十六进制: 0x${hex}</div>
            <div data-copy="${base32}">三十二进制: ${base32}</div>
        `;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">转换失败：${error.message}</span>`;
    }
}

// 十进制转三十二进制
function toBase32(number) {
    const base32Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
    let result = '';
    let num = Math.abs(number);

    if (num === 0) return '0';

    while (num > 0) {
        result = base32Chars[num % 32] + result;
        num = Math.floor(num / 32);
    }

    return number < 0 ? '-' + result : result;
}

// 三十二进制转十进制
function fromBase32(base32Str) {
    const base32Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
    let result = 0;
    let isNegative = false;
    let str = base32Str.toUpperCase();

    if (str.startsWith('-')) {
        isNegative = true;
        str = str.substring(1);
    }

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const value = base32Chars.indexOf(char);
        if (value === -1) {
            throw new Error(`无效的三十二进制字符: ${char}`);
        }
        result = result * 32 + value;
    }

    return isNegative ? -result : result;
}

// URL编码功能
function encodeURL() {
    const input = document.getElementById('urlInput').value.trim();
    const resultContent = document.querySelector('#urlResult .result-content');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入需要编码的文本</span>';
        return;
    }

    try {
        const encoded = encodeURIComponent(input);
        resultContent.textContent = encoded;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">编码失败：${error.message}</span>`;
    }
}

// URL解码功能
function decodeURL() {
    const input = document.getElementById('urlInput').value.trim();
    const resultContent = document.querySelector('#urlResult .result-content');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入需要解码的文本</span>';
        return;
    }

    try {
        const decoded = decodeURIComponent(input);
        resultContent.textContent = decoded;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">解码失败：${error.message}</span>`;
    }
}

// Base64编码功能
function encodeBase64() {
    const input = document.getElementById('base64Input').value.trim();
    const resultContent = document.querySelector('#base64Result .result-content');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入需要编码的文本</span>';
        return;
    }

    try {
        // 使用btoa进行Base64编码
        const encoded = btoa(unescape(encodeURIComponent(input)));
        resultContent.textContent = encoded;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">编码失败：${error.message}</span>`;
    }
}

// Base64解码功能
function decodeBase64() {
    const input = document.getElementById('base64Input').value.trim();
    const resultContent = document.querySelector('#base64Result .result-content');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入需要解码的文本</span>';
        return;
    }

    try {
        // 使用atob进行Base64解码
        const decoded = decodeURIComponent(escape(atob(input)));
        resultContent.textContent = decoded;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">解码失败：${error.message}</span>`;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 更新当前时间戳
    updateCurrentTimestamp();

    // 每秒更新一次当前时间戳
    setInterval(updateCurrentTimestamp, 1000);

    // 为输入框添加回车键支持
    document.getElementById('timestampInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            convertTimestampToTime();
        }
    });

    document.getElementById('timeInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            convertTimeToTimestamp();
        }
    });

    // 添加复制功能提示
    document.addEventListener('click', function (e) {
        // 处理时间戳结果复制
        if (e.target.closest('#timestampResult .result-content div[data-copy]')) {
            const div = e.target.closest('div[data-copy]');
            navigator.clipboard.writeText(div.dataset.copy).then(() => {
                const original = div.innerHTML;
                div.innerHTML = original + '<span style="color: #10b981; margin-left: 8px; font-size: 0.9rem;">✓</span>';
                setTimeout(() => {
                    div.innerHTML = original;
                }, 1000);
            });
            return;
        }

        // 处理进制转换结果复制
        if (e.target.closest('#baseResult .result-content div[data-copy]')) {
            const div = e.target.closest('div[data-copy]');
            navigator.clipboard.writeText(div.dataset.copy).then(() => {
                const original = div.innerHTML;
                div.innerHTML = original + '<span style="color: #10b981; margin-left: 8px; font-size: 0.9rem;">✓</span>';
                setTimeout(() => {
                    div.innerHTML = original;
                }, 1000);
            });
            return;
        }

        // 处理颜色结果复制
        if (e.target.closest('#colorResult .result-content div[data-copy]')) {
            const div = e.target.closest('div[data-copy]');
            navigator.clipboard.writeText(div.dataset.copy).then(() => {
                const original = div.innerHTML;
                div.innerHTML = original + '<span style="color: #10b981; margin-left: 8px; font-size: 0.9rem;">✓</span>';
                setTimeout(() => {
                    div.innerHTML = original;
                }, 1000);
            });
            return;
        }

        // 处理其他结果复制
        const card = e.target.closest('.result-card');
        if (card) {
            const content = card.querySelector('.result-content');
            const text = content.textContent || content.innerText;
            if (text && !text.includes('请输入') && !text.includes('转换失败') &&
                !text.includes('等待')) {
                navigator.clipboard.writeText(text.trim()).then(() => {
                    const original = content.innerHTML;
                    content.innerHTML = original + '<div style="color: #10b981; margin-top: 5px; font-size: 0.9rem;">✓ 已复制</div>';
                    setTimeout(() => {
                        content.innerHTML = original;
                    }, 1000);
                });
            }
        }
    });

    // 初始化时根据hash切换标签页
    if (window.location.hash) {
        const tabName = window.location.hash.substring(1);
        if (['timestamp', 'url', 'base64', 'color', 'base'].includes(tabName)) {
            switchTab(tabName, true);
        }
    }

    // 监听hash变化
    window.addEventListener('hashchange', function () {
        const tabName = window.location.hash.substring(1);
        if (['timestamp', 'url', 'base64', 'color', 'base'].includes(tabName)) {
            switchTab(tabName, true);
        }
    });

    // 进制转换的自动转换功能
    const numberInput = document.getElementById('numberInput');
    const baseRadios = document.querySelectorAll('input[name="inputBase"]');

    // 输入框变化时触发转换
    numberInput.addEventListener('input', convertBase);

    // 进制选择变化时触发转换
    baseRadios.forEach(radio => {
        radio.addEventListener('change', convertBase);
    });

    // 初始化颜色选择器
    const colorPicker = document.getElementById('colorPicker');
    const colorCanvas = document.getElementById('colorCanvas');
    const ctx = colorCanvas.getContext('2d');

    // 绘制颜色选择器
    function drawColorPicker() {
        const width = colorCanvas.width;
        const height = colorCanvas.height;

        // 绘制HSV颜色空间
        const gradientH = ctx.createLinearGradient(0, 0, width, 0);
        gradientH.addColorStop(0, '#FF0000');
        gradientH.addColorStop(0.17, '#FFFF00');
        gradientH.addColorStop(0.34, '#00FF00');
        gradientH.addColorStop(0.51, '#00FFFF');
        gradientH.addColorStop(0.68, '#0000FF');
        gradientH.addColorStop(0.85, '#FF00FF');
        gradientH.addColorStop(1, '#FF0000');
        ctx.fillStyle = gradientH;
        ctx.fillRect(0, 0, width, height);

        // 添加明度渐变
        const gradientV = ctx.createLinearGradient(0, 0, 0, height);
        gradientV.addColorStop(0, 'rgba(255,255,255,0)');
        gradientV.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = gradientV;
        ctx.fillRect(0, 0, width, height);
    }

    // 初始化颜色选择器
    drawColorPicker();

    // 监听颜色选择
    colorPicker.addEventListener('input', function () {
        document.getElementById('colorInput').value = this.value;
        convertColorFromSwatch(this.value);
    });

    // 点击画布触发颜色选择
    colorCanvas.addEventListener('click', function (e) {
        colorPicker.click();
    });

    // 使用自定义颜色
    window.useCustomColor = function () {
        const color = document.getElementById('customColorInput').value.trim();
        if (color) {
            document.getElementById('colorInput').value = color;
            convertColorFromSwatch(color);
        }
    };
});

// 从调色板转换颜色
function convertColorFromSwatch(colorValue) {
    const resultContent = document.querySelector('#colorResult .result-content');
    const colorPreview = document.getElementById('colorPreview');

    try {
        // 解析颜色并转换为各种格式
        const color = parseColor(colorValue);
        if (!color) {
            resultContent.innerHTML = '<span style="color: #ef4444;">无法解析颜色代码</span>';
            return;
        }

        // 更新颜色预览
        colorPreview.innerHTML = `<div class="color-block" style="background: ${color.hex}; width: 100%; height: 80px; border-radius: 8px;"></div>`;

        // 显示转换结果（不含前缀）
        resultContent.innerHTML = `
            <div data-copy="${color.hex}">${color.hex}</div>
            <div data-copy="${color.rgb}">${color.rgb}</div>
            <div data-copy="${color.hsl}">${color.hsl}</div>
            <div data-copy="${color.hsv}">${color.hsv}</div>
            <div data-copy="${color.cmyk}">${color.cmyk}</div>
        `;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">转换失败：${error.message}</span>`;
    }
}

// 颜色转换功能
function convertColor() {
    const input = document.getElementById('colorInput').value.trim();
    const resultContent = document.querySelector('#colorResult .result-content');
    const colorPreview = document.getElementById('colorPreview');

    if (!input) {
        resultContent.innerHTML = '<span style="color: #ef4444;">请输入颜色代码</span>';
        colorPreview.innerHTML = '<div class="color-block" style="background: #e5e7eb;"></div>';
        return;
    }

    try {
        // 解析颜色并转换为各种格式
        const color = parseColor(input);
        if (!color) {
            resultContent.innerHTML = '<span style="color: #ef4444;">无法解析颜色代码</span>';
            return;
        }

        // 更新颜色预览
        colorPreview.innerHTML = `<div class="color-block" style="background: ${color.hex}; width: 100%; height: 80px; border-radius: 8px;"></div>`;

        // 显示转换结果（不含前缀）
        resultContent.innerHTML = `
            <div data-copy="${color.hex}">${color.hex}</div>
            <div data-copy="${color.rgb}">${color.rgb}</div>
            <div data-copy="${color.hsl}">${color.hsl}</div>
            <div data-copy="${color.hsv}">${color.hsv}</div>
            <div data-copy="${color.cmyk}">${color.cmyk}</div>
        `;
    } catch (error) {
        resultContent.innerHTML = `<span style="color: #ef4444;">转换失败：${error.message}</span>`;
    }
}

// 解析颜色函数
function parseColor(input) {
    input = input.trim().toLowerCase();

    // 支持的颜色格式
    const patterns = {
        hex: /^#([0-9a-f]{3}|[0-9a-f]{6})$/,
        rgb: /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
        rgba: /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/,
        hsl: /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/,
        hsla: /^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)$/
    };

    let r, g, b;

    // HEX格式
    if (patterns.hex.test(input)) {
        let hex = input;
        if (input.length === 4) {
            hex = '#' + input[1] + input[1] + input[2] + input[2] + input[3] + input[3];
        }

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
    }
    // RGB/RGBA格式
    else if (patterns.rgb.test(input) || patterns.rgba.test(input)) {
        const match = input.match(patterns.rgb) || input.match(patterns.rgba);
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);
    }
    // HSL/HSLA格式
    else if (patterns.hsl.test(input) || patterns.hsla.test(input)) {
        const match = input.match(patterns.hsl) || input.match(patterns.hsla);
        const hsl = {
            h: parseInt(match[1]),
            s: parseInt(match[2]) / 100,
            l: parseInt(match[3]) / 100
        };

        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
    } else {
        return null;
    }

    // 确保RGB值在0-255范围内
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // 转换为各种格式
    const hex = rgbToHex(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);

    return {
        hex: hex,
        rgb: rgb,
        hsl: hsl,
        hsv: hsv,
        cmyk: cmyk,
        r: r,
        g: g,
        b: b
    };
}

// RGB转HEX
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}

// RGB转HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// RGB转HSV
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h, s = max === 0 ? 0 : d / max;
    const v = max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return `hsv(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
}

// RGB转CMYK
function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

// HSL转RGB
function hslToRgb(h, s, l) {
    h /= 360;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}