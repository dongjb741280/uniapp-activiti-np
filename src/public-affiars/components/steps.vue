<template>
    <scroll-view scroll-x style="height: 160rpx;overflow:hidden;">
    <view class="step-wrap" :style="{flexDirection: direction}">
        <view class="step__item" :class="['step__item--' + direction]" v-for="(item, index) in list" :key="index">
            <view class="step__item__num" v-if="mode == 'number'" :style="{
                backgroundColor: calColor(item.status),
                borderColor: calColor(item.status)
            }">
                <text :style="{
                    color: '#fff',
                }">
                    {{ index + 1 }}
                </text>
                <!-- <u-icon v-else size="22" color="#ffffff" :name="icon"></u-icon> -->
            </view>
            <view class="step__item__dot" v-if="mode == 'dot'" :style="{
                backgroundColor: calColor(item.status)
            }"></view>
            <text class="u-line-1" :style="{
                color: calColor(item.status),
            }" :class="['step__item__text--' + direction]">
                {{ item[name] || item['taskDefName'] }}
            </text>
            <text class="u-line-1 step__item__text--time" :style="{
                color: calColor(item.status),
            }" :class="['step__item__text--' + direction]">
                {{ item[time] || '未处理'}}
            </text>
            <view class="step__item__line" :class="['step__item__line--' + mode]" v-if="index < list.length - 1">
                <u-line :direction="direction" length="100%" :hair-line="false" :color="unActiveColor"></u-line>
            </view>
        </view>
    </view>
    </scroll-view>
</template>
<script>
export default {
    props: {
        // name字段映射
        name: {
            type: String,
            default: 'name'
        },
        time: {
            type: String,
            default: 'time'
        },
		// 步骤条的类型，dot|number
		mode: {
			type: String,
			default: 'dot'
		},
		// 步骤条的数据
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 主题类型, primary|success|info|warning|error
		type: {
			type: String,
			default: 'primary'
		},
		// 当前哪一步是激活的
		current: {
			type: [Number, String],
			default: 0
		},
		// 激活步骤的颜色
		activeColor: {
			type: String,
			default: '#2979ff'
        },
        // 激活步骤的颜色
		rejectColor: {
			type: String,
			default: '#fa3534'
		},
		// 未激活的颜色
		unActiveColor: {
			type: String,
			default: '#909399'
		},
		// 自定义图标
		icon: {
			type: String,
			default: 'checkmark'
		},
		// step的排列方向，row-横向，column-竖向
		direction: {
			type: String,
			default: 'row'
		}
    },
    methods: {
        calColor(status) {
            let color = '';
            switch (status) {
                case 0:
                    color = this.unActiveColor;
                    break;
                case 1:
                    color = this.activeColor;
                    break;
                case 2:
                    color = this.rejectColor;
                    break;
                default:
                    color = this.unActiveColor;
                    break;
            }
            return color;
        }
    }

}
</script>
<style lang="scss">
$u-steps-item-number-width: 44rpx;
$u-steps-item-dot-width: 20rpx;
.step-wrap {
    display: flex;
    padding: 10rpx;
    .step__item{
        flex: 0 0 40%;
        align-items: center;
        position: relative;
		min-width: 100rpx;
		font-size: 26rpx;
        color: #8799a3;
        display: flex;
        &--row {
            display: flex;
            flex-direction: column;
            .step__item__line {
                position: absolute;
				z-index: 0;
				left: 75%;
                width: 50%;
                &--dot {
					top: calc(#{$u-steps-item-dot-width} / 2);
				}

				&--number {
					top: calc(#{$u-steps-item-number-width} / 2);
				}
            }

        }
        &--column {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			min-height: 120rpx;

			.u-steps__item__line {
				position: absolute;
				z-index: 0;
				height: 50%;
				top: 75%;

				&--dot {
					left: calc(#{$u-steps-item-dot-width} / 2);
				}

				&--number {
					left: calc(#{$u-steps-item-number-width} / 2);
				}
			}
		}

		&__num {
			display: flex;
			align-items: center;
			justify-content: center;
			width: $u-steps-item-number-width;
			height: $u-steps-item-number-width;
			border: 1px solid #8799a3;
			border-radius: 50%;
			overflow: hidden;
		}

		&__dot {
			width: $u-steps-item-dot-width;
			height: $u-steps-item-dot-width;
			display: flex;
			border-radius: 50%;
		}

		&__text--row {
            margin-top: 6rpx;
            text-align: center;
            white-space: pre-wrap;
        }
        &__text--time {
            font-size: 20rpx;
			color: $u-tips-color;
		}

		&__text--column {
			margin-left: 14rpx;
		}
    }
}
</style>
