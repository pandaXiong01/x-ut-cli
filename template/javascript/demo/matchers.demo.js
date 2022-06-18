test('测试10与10相匹配', () => {
    // toBe 匹配器 matchers
    // object.is ===
    // const a = { one : 1 };
    // expect(a).toBe({ one : 1 });
    expect(10).toBe(10);
})

test('测试对象内容相等', () => {
    // toEqual 匹配器 内容(不匹配引用)
    const a = { one : 1 };
    expect(a).toEqual({ one : 1 });
})

test('测试null', () => {
    const a = null;
    expect(a).toBeNull();
})

test('测试undefined', () => {
    const a = undefined;
    expect(a).toBeUndefined();
})

test('测试defined', () => {
    const a = null;
    expect(a).toBeDefined();
})

test('测试Truthy', () => {
    const a = 1;
    expect(a).toBeTruthy();
})

test('测试Falsy', () => {
    const a = 0;
    expect(a).toBeFalsy();
})

test('测试not', () => {
    const a = 1;
    expect(a).not.toBeFalsy();
    expect(a).toBeTruthy();
})

// 数字相关的匹配器
test('测试toBeGreaterThan', () => {
    const count = 10;
    expect(count).toBeGreaterThan(9);
})

// toBeLessThan、toBeLessThanOrEqual
// toBeGreaterThanOrEqual
// toBeCloseTo浮点数 0.1+0.2 === 0.3000000001

// 字符串相关匹配器
// toMatch 包含
test('测试toMatch', () => {
    const str = 'www.baidu.com';
    expect(str).toMatch('baidu');
    expect(str).toMatch(/baidu/);
})


// 数组Array，Set
test('测试toContain', () => {
    const arr = ['zhang','guang','jie'];
    const data = new Set(arr);
    expect(data).toContain('zhang');
})

// 异常
const throwNewErrorFunc = () => {
    throw new Error('this is a new error')
}
test('测试toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new error');
})


// https://archive.jestjs.io/docs/en/24.x/expect
// a: watchAll 模式
// f: 只运行失败的测试用例
// o: 集成git，只运行代码发生变化的文件内部用例 --watch 默认直接进入o模式
// p: 根据正则筛选指定文件中的用例。(文件名)
// t: filter模式，根据正则表达式过滤要执行的测试用例(用例名字)
// q: quit