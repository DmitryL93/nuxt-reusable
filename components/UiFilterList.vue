<template>
  <form class="filter-list" @submit.prevent="$emit('submit')">
    <ul class="list">
      <li :class="{ checked: allParameter.checked }" @click="changeAllFilterList">
        <input
          type="checkbox"
          :value="JSON.stringify(allParameter.value)"
          :checked="allParameter.checked"
          :name="name"
          @click.prevent
        />
        <label>{{ allParameter.name }}</label>
      </li>
      <li
        v-for="(item, index) in filterList"
        :key="index"
        :class="{ checked: item.checked }"
        @click="changeItemFlag(item)"
      >
        <input
          type="checkbox"
          :value="JSON.stringify(item.value)"
          :checked="item.checked"
          :name="name"
          @click.prevent
        />
        <label>{{ item.name }}</label>
      </li>
    </ul>
    <div class="filter-list-buttons">
      <button type="submit">Применить</button>
      <button type="submit" @click="resetFilterList">Сбросить</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IFilterListItem } from '@/model/interfaces'

export default defineComponent({
  name: 'UiFilterList',
  props: {
    allParameter: {
      type: Object as PropType<IFilterListItem>,
      required: true
    },
    filterList: {
      type: Array as PropType<IFilterListItem[]>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  emits: ['submit'],
  setup(props) {
    const changeAllFilterList = (): void => {
      props.allParameter.checked = !props.allParameter.checked

      for (let i = 0; i < props.filterList.length; i++) {
        props.filterList[i].checked = props.allParameter.checked
      }
    }

    const changeItemFlag = (item: IFilterListItem): void => {
      props.filterList[props.filterList.indexOf(item)].checked =
        !props.filterList[props.filterList.indexOf(item)].checked

      for (let i = 0; i < props.filterList.length; i++) {
        if (!props.filterList[i].checked) {
          props.allParameter.checked = false
          break
        } else {
          props.allParameter.checked = true
        }
      }
    }

    const resetFilterList = (): void => {
      props.allParameter.checked = true

      for (let i = 0; i < props.filterList.length; i++) {
        props.filterList[i].checked = props.allParameter.checked
      }
    }

    return {
      changeAllFilterList,
      changeItemFlag,
      resetFilterList
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss';

.filter-list {
  @extend %card;
  @include flex(column);

  ul {
    @include flex(column, flex-start, center, 0.25vw);
    width: 100%;

    * {
      cursor: pointer;
    }
  }

  input {
    display: none;
  }

  li {
    line-height: 1.25;
    border: 1px solid #ddd;
    width: 100%;
    padding: 5px 10px;

    &.checked {
      background-color: #efefef;
    }
  }

  .filter-list-buttons {
    @include flex();
  }
}
</style>
