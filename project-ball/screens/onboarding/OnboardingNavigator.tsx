import React, { useState } from 'react';
import { PlayerProfile, Position, SkillLevel, Goal, BBEquipment, GymEquipment } from '../../types/profile';
import { Storage } from '../../lib/storage';
import NameScreen from './NameScreen';
import PositionScreen from './PositionScreen';
import SkillScreen from './SkillScreen';
import GoalsScreen from './GoalsScreen';
import BBEquipmentScreen from './BBEquipmentScreen';
import EquipmentScreen from './EquipmentScreen';
import ScheduleScreen from './ScheduleScreen';

interface Props {
  onComplete: () => void;
}

export interface DraftProfile {
  name?: string;
  position?: Position;
  skillLevel?: SkillLevel;
  goals?: Goal[];
  bbEquipment?: BBEquipment;
  gymEquipment?: GymEquipment;
  daysPerWeek?: number;
  minutesPerSession?: number;
}

export default function OnboardingNavigator({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<DraftProfile>({});

  const next = (update: Partial<DraftProfile>) => {
    const updated = { ...draft, ...update };
    setDraft(updated);
    setStep((s) => s + 1);
  };

  const finish = async (update: Partial<DraftProfile>) => {
    const final = { ...draft, ...update } as PlayerProfile;
    final.createdAt = new Date().toISOString();
    await Storage.setProfile(final);
    await Storage.setOnboardingDone();
    onComplete();
  };

  if (step === 0) return <NameScreen onNext={(name) => next({ name })} />;
  if (step === 1) return <PositionScreen onNext={(position) => next({ position })} stepLabel="2 of 7" />;
  if (step === 2) return <SkillScreen onNext={(skillLevel) => next({ skillLevel })} stepLabel="3 of 7" />;
  if (step === 3) return <GoalsScreen onNext={(goals) => next({ goals })} stepLabel="4 of 7" />;
  if (step === 4) return <BBEquipmentScreen onNext={(bbEquipment) => next({ bbEquipment })} stepLabel="5 of 7" />;
  if (step === 5) return <EquipmentScreen onNext={(gymEquipment) => next({ gymEquipment })} stepLabel="6 of 7" />;
  return <ScheduleScreen onNext={(days, mins) => finish({ daysPerWeek: days, minutesPerSession: mins })} stepLabel="7 of 7" />;
}
