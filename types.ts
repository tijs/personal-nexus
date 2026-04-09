export interface Beacon {
  uri: string;
  cid: string;
  value: {
    $type: "app.beaconbits.beacon";
    venueName: string;
    createdAt: string;
    shout?: string;
    venueAddress?: string;
  };
}
