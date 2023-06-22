export enum TAG {
    TWO_MINUTES = '2 minutes',
    URGENT = 'urgent',
    IMPORTANT = 'important',
}

export enum COLOR {
    // Tag colors
    GRAY = 'bg-zinc-200',
    GREEN = 'bg-lime-300',
    ORANGE = 'bg-amber-300',
    YELLOW = 'bg-yellow-200',

    BLUE = 'bg-blue-200',
    VIOLET = 'bg-violet-300',
}

export const tagScores = {
    [TAG.TWO_MINUTES]: 4,
    [TAG.URGENT]: 2,
    [TAG.IMPORTANT]: 1,
};
