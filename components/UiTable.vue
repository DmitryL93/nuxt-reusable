<template>
  <table :class="styles">
    <thead>
      <tr v-for="(tr, rowIndex) in thead" :key="rowIndex">
        <th
          v-for="(cell, cellIndex) in tr"
          :key="cellIndex"
          :class="cell.class"
          :colspan="cell.colspan"
          :rowspan="cell.rowspan"
          @click="$emit('click-thead-cell', cell, cellIndex, tr, rowIndex)"
        >
          {{ cell.text }}
          <slot v-if="cell.showSlot" name="thead" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr, rowIndex) in tbody" :key="rowIndex">
        <td
          v-for="(cell, cellIndex) in tr"
          :key="cellIndex"
          :class="cell.class"
          :colspan="cell.colspan"
          :rowspan="cell.rowspan"
        >
          {{ cell.text }}
          <slot v-if="cell.showSlot" name="tbody" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ITableCell } from '@/model/interfaces'
import { ETableClass } from '@/model/enums'

export default defineComponent({
  name: 'UiTable',
  props: {
    thead: {
      type: Array as PropType<ITableCell[][]>,
      required: true
    },
    tbody: {
      type: Array as PropType<ITableCell[][]>,
      required: true
    },
    styles: {
      type: String,
      default: ETableClass.default as ETableClass,
      validator(value: ETableClass) {
        return [ETableClass.default, ETableClass.zebra, ETableClass.straps].includes(value)
      }
    }
  },
  emits: ['click-thead-cell', 'mouseenter-thead-cell', 'mouseleave-thead-cell']
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss';

.default {
  @extend %default-table;
}

.zebra {
  @extend %zebra-table;
}

.straps {
  @extend %straps-table;
}
</style>
