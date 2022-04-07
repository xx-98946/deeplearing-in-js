import * as tf from "@tensorflow/tfjs"

// 训练集
const trainData = {
    sizeMB: [0.080, 9.000, 0.001, 0.100, 8.000,
        5.000, 0.100, 6.000, 0.050, 0.500,
        0.002, 2.000, 0.005, 10.00, 0.010,
        7.000, 6.000, 5.000, 1.000, 1.000],
    timeSec: [0.135, 0.739, 0.067, 0.126, 0.646,
        0.435, 0.069, 0.497, 0.068, 0.116,
        0.070, 0.289, 0.076, 0.744, 0.083,
        0.560, 0.480, 0.399, 0.153, 0.149]
};

// 测试集
const testData = {
    sizeMB: [5.000, 0.200, 0.001, 9.000, 0.002,
        0.020, 0.008, 4.000, 0.001, 1.000,
        0.005, 0.080, 0.800, 0.200, 0.050,
        7.000, 0.005, 0.002, 8.000, 0.008],
    timeSec: [0.425, 0.098, 0.052, 0.686, 0.066,
        0.078, 0.070, 0.375, 0.058, 0.136,
        0.052, 0.063, 0.183, 0.087, 0.066,
        0.558, 0.066, 0.068, 0.610, 0.057]
};


// 转换成张量

const trainTensors = {
    sizeMB: tf.tensor2d(trainData.sizeMB, [20, 1]),
    timeSec: tf.tensor2d(trainData.timeSec, [20, 1]),
}

const testTensors = {
    sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
    timeSec: tf.tensor2d(testData.timeSec, [20, 1]),
}

/**
 * 创建训练模型
 * sequential 表示创建线性模型，y = ax + b， 模型推断 a 和 b 的值
 * add 表示添加一层神经网络，参数的含义暂不清楚
 * compile 表示模型编译，需要参数：
 *      optimizer(优化器)： 怎样调整参数以调小损失函数，sgd表示随机梯度下降
 *      loss(损失函数) ：误差是如何度量的，meanAbsoluteError表示绝对值平均数
 */
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
model.compile({ optimizer: "sgd", loss: "meanAbsoluteError" });

// 开始训练
(async function () {
    // fit 表示开始拟合数据，epochs 表示训练步数
    await model.fit(trainTensors.sizeMB, trainTensors.timeSec, { epochs: 200 });

    /**
     * 计算测试数据的损失值，meanAbsoluteError 是越小越好
     * evaluate 用于计算损失值
     */
    model.evaluate(testTensors.sizeMB, testTensors.timeSec).print();

    /**
     * 使用模型进行推断
     */
    const p = tf.tensor2d([[1]]);
    console.log("——下载1MB文件时间预测：");
    model.predict(p).print();
})();
