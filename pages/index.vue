<template>
  <main v-if="!fatalError && !loading">
    <div class="top-grid">
      <UiFilterList
        :name="filterList.name"
        :all-parameter="filterList.allParameter"
        :filter-list="filterList.items"
        @submit="init(true)"
      />
      <div class="table-wrapper">
        <div class="table-buttons">
          <button @click="changeTableStyles">изменить дизайн таблицы</button>
          <button @click="flipTableLayout">изменить раскладку таблицы</button>
        </div>
        <div class="table-card">
          <UiTable
            :thead="table.thead"
            :tbody="table.tbody"
            :styles="table.styles"
            :value-attribute="table.attribute"
            @click-thead-cell="clickTheadCell"
          />
        </div>
      </div>
    </div>
    <div class="cards-grid">
      <UserCard v-for="(item, index) in userCards.items" :key="index" :user="item" />
    </div>
  </main>
  <main class="loading" v-else-if="!fatalError && loading">
    <Loader />
  </main>
  <main v-else class="fatal-error">
    <h1>Произошла ошибка!</h1>
    <p class="description">{{ fatalErrorDescription }}</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, reactive, onMounted, set } from '@nuxtjs/composition-api'
import Axios from 'axios'
import { Converter, Table, FilterList, Monad } from '@/model/classes'
import { ITableCell, IUser, IFilterListItem } from '@/model/interfaces'
import { ETableClass, ETableLayout } from '@/model/enums'
import UiTable from '@/components/UiTable.vue'
import UiFilterList from '@/components/UiFilterList.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    UiTable,
    UiFilterList,
    Loader
  },
  setup() {
    const loading: Ref<boolean> = ref(false)
    const toogleLoading = (): void => {
      loading.value = !loading.value
    }

    const fatalError: Ref<boolean> = ref(false)
    const toggleFatalError = (): void => {
      fatalError.value = !fatalError.value
    }
    const fatalErrorDescription: Ref<string> = ref('')

    const users: Ref<IUser[]> = ref([])

    const filterList = reactive({
      name: 'general-filter',
      allParameter: {
        name: 'Все',
        value: 'all',
        checked: true
      } as IFilterListItem,
      items: [] as IFilterListItem[]
    })
    const table = reactive({
      thead: [] as ITableCell[][],
      tbody: [] as ITableCell[][],
      styles: ETableClass.default as ETableClass,
      attribute: 'user-value',
      layout: ETableLayout.vertical as ETableLayout
    })
    const userCards = reactive({
      items: [] as IUser[]
    })

    const createFilterList = (): void => {
      filterList.items = []

      for (let i = 0; i < users.value.length; i++) {
        filterList.items.push(FilterList.createItem(users.value[i].name, users.value[i].id))
      }
    }

    const createVerticalTable = (): void => {
      clearTable()

      table.thead = [
        [
          Table.createTableCell('имя', { column: 'name', onClick: 'sort' }, { class: 'hover' }),
          Table.createTableCell('email', { column: 'email' }),
          Table.createTableCell('телефон', { column: 'phone' }),
          Table.createTableCell('username', { column: 'username' }),
          Table.createTableCell('сайт', { column: 'website' }),
          Table.createTableCell('адрес', { column: 'address' }),
          Table.createTableCell('компания', { column: 'company' })
        ]
      ]

      for (let i = 0; i < users.value.length; i++) {
        table.tbody.push([
          Table.createTableCell(users.value[i].name, { column: 'name', id: users.value[i].id }),
          Table.createTableCell(users.value[i].email, { column: 'email', id: users.value[i].id }),
          Table.createTableCell(users.value[i].phone, { column: 'phone', id: users.value[i].id }),
          Table.createTableCell(users.value[i].username, { column: 'username', id: users.value[i].id }),
          Table.createTableCell(users.value[i].website, { column: 'website', id: users.value[i].id }),
          Table.createTableCell(users.value[i].address.city, { column: 'address', id: users.value[i].id }),
          Table.createTableCell(users.value[i].company.name, { column: 'company', id: users.value[i].id })
        ])
      }
    }

    const createHorizontalTable = (): void => {
      clearTable()

      table.thead = [[Table.createTableCell('имя', { row: 'name', onClick: 'sort' }, { class: 'hover' })]]

      table.tbody = [
        [Table.createTableCell('username', { row: 'username' })],
        [Table.createTableCell('email', { row: 'email' })],
        [Table.createTableCell('телефон', { row: 'phone' })],
        [Table.createTableCell('сайт', { row: 'website' })],
        [Table.createTableCell('адрес', { row: 'address' })],
        [Table.createTableCell('компания', { row: 'company' })]
      ]

      for (let i = 0; i < users.value.length; i++) {
        table.thead[0].push(Table.createTableCell(users.value[i].name, { row: 'name', id: users.value[i].id }))
        table.tbody[0].push(Table.createTableCell(users.value[i].username, { row: 'name', id: users.value[i].id }))
        table.tbody[1].push(Table.createTableCell(users.value[i].email, { row: 'email', id: users.value[i].id }))
        table.tbody[2].push(Table.createTableCell(users.value[i].phone, { row: 'phone', id: users.value[i].id }))
        table.tbody[3].push(Table.createTableCell(users.value[i].website, { row: 'website', id: users.value[i].id }))
        table.tbody[4].push(
          Table.createTableCell(users.value[i].address.city, { row: 'address', id: users.value[i].id })
        )
        table.tbody[5].push(
          Table.createTableCell(users.value[i].company.name, { row: 'company', id: users.value[i].id })
        )
      }
    }

    const clearTable = (): void => {
      table.thead = []
      table.tbody = []
    }

    const changeTableStyles = (): void => {
      switch (table.styles) {
        case ETableClass.default:
          table.styles = ETableClass.zebra
          break
        case ETableClass.zebra:
          table.styles = ETableClass.straps
          break
        case ETableClass.straps:
          table.styles = ETableClass.default
          break
      }
    }

    const flipTableLayout = (): void => {
      switch (table.layout) {
        case ETableLayout.horizontal:
          table.layout = ETableLayout.vertical
          createVerticalTable()
          break
        case ETableLayout.vertical:
          table.layout = ETableLayout.horizontal
          createHorizontalTable()
          break
      }
    }

    /**
     * Ключевой метод и особенность программы, срабатывает при нажатии на ячейку таблицы 'имя' в шапке
     */
    const clickTheadCell = (cell: ITableCell, cellIndex: number, _: ITableCell[], rowIndex: number): void => {
      if (cell.value.onClick === 'sort' && cell.value.sorted === 'asc') {
        if (table.layout === ETableLayout.vertical) {
          table.tbody = Table.sortColumn(cellIndex, 'desc', table.tbody)
        } else if (table.layout === ETableLayout.horizontal) {
          const mergedTable = [...table.thead, ...table.tbody]
          const navColumn = Table.cloneColumn(0, mergedTable)
          const result = new Monad(mergedTable)
            .run(Table.shiftColumn)
            .run(Table.sortRow.bind(undefined, rowIndex, 'desc'))
            .run(Table.unshiftColumn.bind(undefined, navColumn))
            .getValue() as ITableCell[][]
          table.thead = Converter.cloneData([result[0]]) as ITableCell[][]
          table.tbody = Converter.cloneData(result.filter((_, index) => index > 0)) as ITableCell[][]
        }

        filterList.items = FilterList.sortItems('desc', filterList.items)
        userCards.items = FilterList.sortItems('desc', userCards.items as any) as any

        set(table.thead[rowIndex][cellIndex].value, 'sorted', 'desc')
      } else if (cell.value.onClick === 'sort') {
        if (table.layout === ETableLayout.vertical) {
          table.tbody = Table.sortColumn(cellIndex, undefined, table.tbody)
        } else if (table.layout === ETableLayout.horizontal) {
          const mergedTable = [...table.thead, ...table.tbody]
          const navColumn = Table.cloneColumn(0, mergedTable)
          const result = new Monad(mergedTable)
            .run(Table.shiftColumn)
            .run(Table.sortRow.bind(undefined, rowIndex, 'asc'))
            .run(Table.unshiftColumn.bind(undefined, navColumn))
            .getValue() as ITableCell[][]
          table.thead = Converter.cloneData([result[0]]) as ITableCell[][]
          table.tbody = Converter.cloneData(result.filter((_, index) => index > 0)) as ITableCell[][]
        }

        filterList.items = FilterList.sortItems(undefined, filterList.items)
        userCards.items = FilterList.sortItems(undefined, userCards.items as any) as any

        set(table.thead[rowIndex][cellIndex].value, 'sorted', 'asc')
      }
    }

    const createUserCards = (): void => {
      userCards.items = Converter.cloneData(users.value) as IUser[]
    }

    // в api нет необходимого фильтра поэтому используется флаг-костыль byFilter
    const requestUsers = async (byFilter: boolean = false): Promise<void> => {
      const response = await Axios.get('https://jsonplaceholder.typicode.com/users')

      if (response.status === 200) {
        users.value = []

        if (!byFilter) {
          users.value = response.data
        } else {
          if (filterList.allParameter.checked) {
            users.value = response.data
          } else {
            for (let i = 0; i < filterList.items.length; i++) {
              for (let j = 0; j < response.data.length; j++) {
                if (filterList.items[i].checked && filterList.items[i].value === response.data[j].id) {
                  users.value.push(response.data[j])
                }
              }
            }
          }
        }
      } else {
        toggleFatalError()
        fatalErrorDescription.value = `Запрос вернул код ошибки: ${response.status}`
      }
    }

    const init = async (byFilter: boolean = false): Promise<void> => {
      toogleLoading()
      await requestUsers(byFilter)
      table.layout === ETableLayout.vertical ? createVerticalTable() : createHorizontalTable()
      createFilterList()
      createUserCards()
      toogleLoading()
    }

    onMounted(() => {
      init()
    })

    return {
      loading,
      fatalError,
      fatalErrorDescription,
      table,
      changeTableStyles,
      flipTableLayout,
      clickTheadCell,
      filterList,
      userCards,
      init
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss';

main {
  @extend %container;
  margin-top: 4vw;
  margin-bottom: 4vw;
  @include flex(column);

  .top-grid {
    @include grid(4, 1vw);
    grid-template-columns: 1fr 3fr;
    width: 100%;
  }

  button {
    @extend %button;
  }

  .table-wrapper {
    @include flex(column, flex-start);
  }

  .table-buttons {
    @include flex(row, flex-end);
    width: 100%;
  }

  .table-card {
    @extend %card;
    overflow: auto;
    width: 63.5vw;

    th.hover {
      &:hover {
        background-color: #cecece !important;
        cursor: pointer;
      }
    }
  }

  .filter-card {
    @extend %card;
  }

  .cards-grid {
    @include grid(4, 1vw);
    width: 100%;
  }
}

main.loading {
  @include flex();
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

main.fatal-error {
  @include flex(column);

  h1 {
    font-size: 2vw;
    text-align: center;
  }

  .description {
    text-align: center;
    font-size: 1.5vw;
  }
}
</style>
