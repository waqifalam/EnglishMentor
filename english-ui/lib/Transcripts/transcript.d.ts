export interface TranscriptItem {
  id: string;
  text: string;
}

export interface TranscriptDao {
  uuid: string;
  transcriptItem: TranscriptItem;
}

export interface TranscriptResult extends TranscriptItem {
  correction: string;
}
