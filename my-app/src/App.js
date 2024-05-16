import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const clickNext = (e, index) => {
		console.log(index);
		const updateIndex = index !== undefined ? index : activeIndex + 1;
		console.log(updateIndex);
		if (activeIndex === 0) {
			setIsFirst(false);
		} else if (updateIndex === 0) {
			setIsFirst(true);
			setIsLast(false);
		} else if (updateIndex === steps.length - 1) {
			setIsLast(true);
		}
		setActiveIndex(updateIndex);
	};

	const clickPreceding = () => {
		setActiveIndex((i) => i - 1);
		if (activeIndex - 1 === 0) setIsFirst(true);
	};

	const clickFromTheStart = () => {
		setActiveIndex(0);
		setIsFirst(true);
		setIsLast(false);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let [isFirst, setIsFirst] = useState(true);
	let [isLast, setIsLast] = useState(false);

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
						{[...data].map(({ id, title, content }, index) => (
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
									onClick={(e) => {
										clickNext(e, index);
									}}
									className={styles['steps-item-button']}
								>
									{index + 1}
								</button>
								{steps[index].title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={clickPreceding}
							disabled={isFirst}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={
								!isLast
									? (e) => {
											clickNext();
										}
									: clickFromTheStart
							}
						>
							{!isLast ? 'Далее' : 'Начать сначала'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
