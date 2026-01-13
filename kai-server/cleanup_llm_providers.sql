-- 清理数据库中非 Ollama 的 LLM 提供商数据
-- 仅保留 ollama 和 default (本地嵌入模型)

-- 删除非 Ollama/default 的供应商信息
DELETE FROM t_sys_model_prvd_info WHERE prvd_id NOT IN ('ollama', 'default');

-- 删除非 Ollama/default 的模型
DELETE FROM t_sys_model_prvd_modl WHERE prvd_id NOT IN ('ollama', 'default');

-- 删除非 Ollama/default 的参数配置
DELETE FROM t_sys_model_prvd_param WHERE prvd_id NOT IN ('ollama', 'default');

-- 删除用户为非 Ollama/default 供应商配置的参数
DELETE FROM t_sys_model_param WHERE prvd_id NOT IN ('ollama', 'default');

-- 查看清理后的结果
SELECT * FROM t_sys_model_prvd_info;
SELECT * FROM t_sys_model_prvd_modl;
