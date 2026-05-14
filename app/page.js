"use client";

import { useMemo, useState } from "react";

const orders = [
  { id: "DD-20260514-001", customer: "上海辰野科技", amount: "¥18,240", status: "已完成", createdAt: "2026-05-14 09:18", owner: "林静" },
  { id: "DD-20260514-002", customer: "杭州云麓商贸", amount: "¥6,980", status: "处理中", createdAt: "2026-05-14 10:06", owner: "周航" },
  { id: "DD-20260514-003", customer: "深圳南谷门店", amount: "¥32,500", status: "待付款", createdAt: "2026-05-14 10:42", owner: "陈维" },
  { id: "DD-20260513-014", customer: "北京朗拓集团", amount: "¥12,160", status: "已完成", createdAt: "2026-05-13 16:25", owner: "王敏" },
  { id: "DD-20260513-011", customer: "成都青禾生活", amount: "¥4,760", status: "处理中", createdAt: "2026-05-13 14:07", owner: "赵宁" },
  { id: "DD-20260512-028", customer: "南京启澜零售", amount: "¥9,430", status: "已完成", createdAt: "2026-05-12 18:31", owner: "许安" }
];

const navItems = ["总览", "用户", "订单", "商品", "设置"];
const chartBars = [
  { label: "一", value: "58%" },
  { label: "二", value: "74%" },
  { label: "三", value: "46%" },
  { label: "四", value: "88%" },
  { label: "五", value: "66%" },
  { label: "六", value: "92%" },
  { label: "日", value: "78%" }
];

function getStatusClass(status) {
  if (status === "已完成") return "done";
  if (status === "处理中") return "processing";
  return "pending";
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loginHint, setLoginHint] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesKeyword = `${order.id} ${order.customer}`.toLowerCase().includes(normalizedKeyword);
      const matchesStatus = status === "all" || order.status === status;
      return matchesKeyword && matchesStatus;
    });
  }, [keyword, status]);

  function handleLogin(event) {
    event.preventDefault();

    if (!account.trim() || !password.trim()) {
      setLoginHint("请输入账号和密码。");
      return;
    }

    setLoginHint("登录成功，正在进入控制台。");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setLoginHint("");
  }

  return (
    <main className="app-shell">
      {!isLoggedIn ? (
        <section className="login-view" aria-label="登录">
          <div className="login-panel">
            <div className="brand-block">
              <div className="brand-mark" aria-hidden="true">星</div>
              <div>
                <h1>星桥后台管理</h1>
                <p>运营数据、用户状态和订单处理集中管理</p>
              </div>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <label>
                <span>账号</span>
                <input
                  type="text"
                  value={account}
                  autoComplete="username"
                  required
                  onChange={(event) => setAccount(event.target.value)}
                />
              </label>
              <label>
                <span>密码</span>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <div className="form-row">
                <label className="check-line">
                  <input type="checkbox" defaultChecked />
                  <span>记住登录状态</span>
                </label>
                <a href="#help">忘记密码</a>
              </div>
              <button className="primary-btn" type="submit">登录控制台</button>
              {loginHint && <p className="form-hint">{loginHint}</p>}
            </form>
          </div>
        </section>
      ) : (
        <section className="dashboard-view" aria-label="后台数据展示">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <div className="brand-mark" aria-hidden="true">星</div>
              <strong>星桥管理</strong>
            </div>
            <nav className="side-nav" aria-label="主导航">
              {navItems.map((item) => (
                <button className={item === "总览" ? "is-active" : ""} type="button" key={item}>
                  {item}
                </button>
              ))}
            </nav>
          </aside>

          <div className="content-area">
            <header className="topbar">
              <div>
                <p className="eyebrow">管理控制台</p>
                <h2>运营总览</h2>
              </div>
              <div className="top-actions">
                <button className="icon-btn" type="button" title="通知" aria-label="通知">!</button>
                <div className="user-chip">
                  <span className="avatar" aria-hidden="true">A</span>
                  <span>管理员</span>
                </div>
                <button className="ghost-btn" type="button" onClick={handleLogout}>退出</button>
              </div>
            </header>

            <section className="metric-grid" aria-label="核心指标">
              <article className="metric-card">
                <span>今日收入</span>
                <strong>¥128,640</strong>
                <small>较昨日 +12.8%</small>
              </article>
              <article className="metric-card">
                <span>新增用户</span>
                <strong>2,438</strong>
                <small>转化率 8.4%</small>
              </article>
              <article className="metric-card">
                <span>待处理订单</span>
                <strong>186</strong>
                <small>平均响应 14 分钟</small>
              </article>
              <article className="metric-card">
                <span>活跃门店</span>
                <strong>72</strong>
                <small>本周新增 5 家</small>
              </article>
            </section>

            <section className="workspace">
              <div className="chart-panel">
                <div className="section-head">
                  <div>
                    <p className="eyebrow">趋势</p>
                    <h3>近 7 日访问量</h3>
                  </div>
                  <select aria-label="趋势时间范围" defaultValue="本周">
                    <option>本周</option>
                    <option>本月</option>
                  </select>
                </div>
                <div className="bar-chart" aria-label="近 7 日访问量柱状图">
                  {chartBars.map((bar) => (
                    <span style={{ "--bar": bar.value }} key={bar.label}>
                      <b>{bar.label}</b>
                    </span>
                  ))}
                </div>
              </div>

              <div className="task-panel">
                <div className="section-head">
                  <div>
                    <p className="eyebrow">待办</p>
                    <h3>处理队列</h3>
                  </div>
                </div>
                <ul className="task-list">
                  <li><span className="dot danger"></span>退款审核 <strong>24</strong></li>
                  <li><span className="dot warning"></span>库存预警 <strong>13</strong></li>
                  <li><span className="dot success"></span>内容复核 <strong>8</strong></li>
                </ul>
              </div>
            </section>

            <section className="data-panel">
              <div className="section-head table-head">
                <div>
                  <p className="eyebrow">数据</p>
                  <h3>订单列表</h3>
                </div>
                <div className="filters">
                  <input
                    type="search"
                    placeholder="搜索客户或订单号"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                  <select
                    aria-label="状态筛选"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="all">全部状态</option>
                    <option value="已完成">已完成</option>
                    <option value="处理中">处理中</option>
                    <option value="待付款">待付款</option>
                  </select>
                </div>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>订单号</th>
                      <th>客户</th>
                      <th>金额</th>
                      <th>状态</th>
                      <th>创建时间</th>
                      <th>负责人</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.amount}</td>
                        <td><span className={`status ${getStatusClass(order.status)}`}>{order.status}</span></td>
                        <td>{order.createdAt}</td>
                        <td>{order.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <span>共 {filteredOrders.length} 条</span>
                <div className="pager" aria-label="分页">
                  <button type="button" disabled>上一页</button>
                  <button type="button" className="is-active">1</button>
                  <button type="button">2</button>
                  <button type="button">下一页</button>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </main>
  );
}
