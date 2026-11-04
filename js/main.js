/* ============================================================
   青禾阅读 · 下导航设计
   高级网页设计 I —— 图像解决方案（四级项目）
   学号：24003140406  姓名：胡国静  类名前缀：Hgj406
   功能：下导航选项卡切换（显示对应内容面板）、未读角标清除
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.add('Hgj406-js');

  var items = Array.prototype.slice.call(
    document.querySelectorAll('.Hgj406-tabbar__item')
  );
  var panels = Array.prototype.slice.call(
    document.querySelectorAll('.Hgj406-panel')
  );

  if (!items.length || !panels.length) return;

  function select(index) {
    // 切换下导航激活态
    items.forEach(function (item, i) {
      var active = i === index;
      item.classList.toggle('Hgj406-is-active', active);
      var link = item.querySelector('.Hgj406-tabbar__link');
      if (link) {
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
    });

    // 切换内容面板显示
    var target = items[index].getAttribute('data-target');
    panels.forEach(function (panel) {
      var show = panel.getAttribute('data-panel') === target;
      panel.classList.toggle('Hgj406-is-active', show);
      if (show) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });

    // 点击“消息”时清除未读角标
    if (target === 'msg') {
      var badge = items[index].querySelector('.Hgj406-badge');
      if (badge) badge.remove();
      // 消息面板内的未读标记变已读
      panels.forEach(function (panel) {
        if (panel.getAttribute('data-panel') === 'msg') {
          panel.querySelectorAll('.Hgj406-msg--unread').forEach(function (m) {
            m.classList.remove('Hgj406-msg--unread');
            var dot = m.querySelector('.Hgj406-msg__dot');
            if (dot) dot.remove();
          });
        }
      });
    }
  }

  items.forEach(function (item, i) {
    var link = item.querySelector('.Hgj406-tabbar__link');
    if (!link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      select(i);
    });
  });
})();
