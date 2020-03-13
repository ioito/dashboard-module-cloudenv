import {
  getAccessUrlTableColumn,
  getBalanceTableColumn,
  getGuestCountTableColumn,
  getHostCountTableColumn,
} from '../utils/columns'
import {
  getBrandTableColumn,
  getStatusTableColumn,
  getEnabledTableColumn,
  getPublicTableColumn,
  getCopyWithContentTableColumn,
  getNameDescriptionTableColumn,
  getProjectTableColumn,
} from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{ row.name }</side-page-trigger>
          )
        },
      }),
      getAccessUrlTableColumn(),
      getEnabledTableColumn(),
      getStatusTableColumn({ statusModule: 'cloudaccount' }),
      getStatusTableColumn({ statusModule: 'cloudaccountHealthStatus', title: '健康状态', field: 'health_status', minWidth: 90 }),
      getGuestCountTableColumn(),
      getBalanceTableColumn(),
      getHostCountTableColumn(),
      getCopyWithContentTableColumn({ field: 'account', title: '账号' }),
      getBrandTableColumn(),
      getEnabledTableColumn({ field: 'enable_auto_sync', title: '自动同步', minWidth: 90 }),
      {
        field: 'last_auto_sync',
        title: '同步时间',
        width: 70,
        slots: {
          default: ({ row }) => {
            if (row.sync_status !== 'idle') { // 表示正在同步中
              return [
                <status status={ row.sync_status } statusModule='cloudaccountSyncStatus' />,
              ]
            } else {
              let time = this.$moment(row.last_sync)
              if (time) {
                return time.fromNow()
              } else {
                return '-'
              }
            }
          },
        },
      },
      getPublicTableColumn(),
      getProjectTableColumn(),
    ]
  },
}