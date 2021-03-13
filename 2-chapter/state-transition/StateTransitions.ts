import { State } from './State';

/**
 * 状態遷移を管理するクラス
 */
export class StateTransitions {
    private readonly allowed = new Map<State, Set<State>>();

    constructor() {
        this.allowed.set(
            '審査中',
            new Set<State>(['承認済み', '差し戻し中'])
        );
        this.allowed.set(
            '承認済み',
            new Set<State>(['実施中', '終了'])
        );
        this.allowed.set(
            '差し戻し中',
            new Set<State>(['審査中', '終了'])
        );
        this.allowed.set(
            '実施中',
            new Set<State>(['中断中', '終了'])
        );
        this.allowed.set(
            '中断中',
            new Set<State>(['実施中', '終了'])
        );
    }

    /**
     * 遷移可能か判断する
     */
    public canTransit(from: State, to: State): boolean {
        const allowedStates = this.allowed.get(from);
        if (allowedStates == null) throw new Error('状態が存在しません');
        return allowedStates.has(to);
    }
}
