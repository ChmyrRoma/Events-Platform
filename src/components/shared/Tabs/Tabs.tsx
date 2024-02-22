import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import classNames from 'classnames';

import styles from './tabs.module.scss';

export interface ITab {
  id: number
  title: string
  path: string
  content: ReactJSXElement
}

interface IProps {
  defaultTabId: number | null
  tabs: ITab[]
}

const Tabs = ({ defaultTabId, tabs }: IProps) => {
  const [currentTab, setCurrentTab] = useState<ITab | null>(null);

  useEffect(() => {
    let tab = null;
    if (tabs.length && defaultTabId) {
      tab = tabs.find(el => el.id === defaultTabId)
    } else if (tabs.length) {
      tab = tabs[0];
    }

    setCurrentTab(tab)
  }, [defaultTabId, tabs]);

  const handleChangeTab = (newTab: ITab) => {
    setCurrentTab(newTab);
  };

  return (
    <div className={styles.block}>
      <div className={styles.block__content}>
      {tabs.map(el => (
        <Link to={el.path} className={styles.block__content_link} key={el.id}>
          <div
            className={classNames(
              styles.block__content_title,
              { [styles.block__content_active]: el.id === currentTab?.id }
            )}
            onClick={() => handleChangeTab(el)}
          >
            {el.title}
          </div>
        </Link>
      ))}
      </div>
      { currentTab && (
        <div className={styles.block__button}>
          {currentTab.content}
        </div>
      )}
    </div>
  )
}

export default Tabs;
