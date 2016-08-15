import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import reportStore from '../../js/reportStore';
import classNameNames from 'classNames/bind';
import styles from './status-bar.css';

const cx = classNameNames.bind(styles);

const StatusBar = observer(({ stats }) => {
  const { hasOther, hasSkipped, other, skipped, pendingPercent, passPercent, passPercentClass } = stats;
  const cxname = cx('component', {
    'has-failed-hooks': hasOther,
    'has-skipped-tests': hasSkipped,
    qs: reportStore.showQuickSummary
  });
  const skippedText = `${skipped} Skipped Test${skipped > 1 ? 's' : ''}`;
  const failedText = `${other} Failed Hook${other > 1 ? 's' : ''}`;

  return (
    <div className={ cxname }>
      <div className='container'>
        <div className='row'>
          { !!hasOther && <div className={ cx('item', 'hooks', 'danger') }>{ failedText }</div> }
          { !!hasSkipped && <div className={ cx('item', 'skipped', 'danger') }>{ skippedText }</div> }
          <div className={ cx('item', 'pending-pct') }>{ `${pendingPercent}% Pending` }</div>
          <div className={ cx('item', 'passing-pct', passPercentClass) }>{ `${passPercent}% Passing` }</div>
        </div>
      </div>
    </div>
  );
});

StatusBar.propTypes = {
  stats: PropTypes.object
};

export default StatusBar;
