import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const clickNext = (e, index) => {
		const isCurrentLast = activeIndex === steps.length - 1;
		let newActiveIndex = isCurrentLast ? 0 : activeIndex + 1;

		setActiveIndex(newActiveIndex);
	};

	const clickBack = () => {
		const isCurrentFirst = activeIndex === 0;
		let newActiveIndex = isCurrentFirst ? steps.length - 1 : activeIndex - 1;

		setActiveIndex(newActiveIndex);
	};

	const clickDot = (index) => {
		setActiveIndex(index);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isFirst = activeIndex === 0;
	const isLast = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{/*Контент соответственный шагу. Сейчас активен шаг 3*/}
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{data.map(({ id, title, content }, index) => (
							<li
								className={
									styles['steps-item'] +
									' ' +
									(index <= activeIndex ? styles.done : '') +
									' ' +
									(activeIndex === index ? styles.active : '')
								}
								key={id}
							>
								<button
									onClick={() => clickDot(index)}
									className={styles['steps-item-button']}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={clickBack}>
							{isFirst ? 'Начать с конца' : 'Назад'}
						</button>
						<button className={styles.button} onClick={clickNext}>
							{!isLast ? 'Далее' : 'Начать сначала'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
