---
title: "Hibernate 多线程下 No Session 问题"
date: 2019-07-23T21:37:28+08:00
tags: ["踩坑记录", "后端"]
---

```
问题     : Hibernate 使用多线程，且在线程内部获取对象懒加载的属性就会出现 No Session。
原因     : 其他线程并未获取到Session。
```

```
// 解决方法1

public static boolean bindHibernateSessionToThread(SessionFactory sessionFactory) {
    if (TransactionSynchronizationManager.hasResource(sessionFactory)) {
        return true;
    } else {
        Session session = sessionFactory.openSession();
        session.setFlushMode(FlushMode.MANUAL);
        SessionHolder sessionHolder = new SessionHolder(session);
        TransactionSynchronizationManager.bindResource(sessionFactory, sessionHolder);
    }
    return false;
}

// 将线程上绑定的Session关闭
public static void closeHibernateSessionFromThread(boolean participate, Object sessionFactory) {
    if (!participate) {
        SessionHolder sessionHolder = (SessionHolder)TransactionSynchronizationManager.unbindResource(sessionFactory);
        SessionFactoryUtils.closeSession(sessionHolder.getSession());
    }
}

//使用(注意在线程中使用的对象要是在线程中查出来的，不能是查出来再开线程)
SessionFactory sessionFactory = ContextHolder.getBean(SessionFactory.class);
boolean participate = ConcurrentUtil.bindHibernateSessionToThread(sessionFactory);
//...Method
ConcurrentUtil.closeHibernateSessionFromThread(participate, sessionFactory);


// 解决方法2
// 配置 Hibernate Lazy="false"
```
